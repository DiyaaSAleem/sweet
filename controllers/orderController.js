const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const Product = require("../models/productModel");
const Location = require("../models/locationModel");
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const axios = require("axios");
exports.getAllOrder = factory.getAllpop1(
  Order,
  {
    path: "user",
    select: "name phone -_id",
  },
  {
    path: "cart.product",
    select: "name price -_id",
  },
  {
    path: "delivery",
    select: "name phone -_id",
  },
  {
    path: "location",
  }
);
exports.getOrder = factory.getOne(
  Order,
  {
    path: "user",
    select: "name phone -_id",
  },
  {
    path: "cart.product",
    select: "name price -_id",
  },
  {
    path: "delivery",
    select: "name phone -_id",
  },
  {
    path: "location",
  },
  {
    path: "branch",
    select: "name -_id",
  }
);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.createOrder = catchAsync(async (req, res, next) => {
  const thisBranch = await Branch.findById(req.body.branch);
  req.body.total = 0;
  let thisProduct;
  if (req.body.statuspaid == "نقدي") {
    req.body.paid = false;
  }
  for (let i = 0; i < req.body.cart.length; i++) {
    thisProduct = await Product.findById(req.body.cart[i].product);
    if (!thisProduct) return next(new AppError("Product is not defind", 400));
    req.body.cart[i] = {
      product: req.body.cart[i].product,
      quantity: req.body.cart[i].quantity,
      price: thisProduct.price * req.body.cart[i].quantity,
    };
    req.body.total += thisProduct.price * req.body.cart[i].quantity;
  }
  /////////////////////////////////////////////يتطلب اتصال بشبكة//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (req.body.withDelivery) {
    const locationBranch = await Location.findById(thisBranch.location);
    const locationUser = await Location.findById(req.body.location);
    if (!locationBranch || !locationUser)
      return next(new AppError("Location is not defund", 400));
    // تعيين إحداثيات النقطتين
    const point1 = {
      latitude: locationBranch.Latitude,
      longitude: locationBranch.Longitude,
    };
    const point2 = {
      latitude: locationUser.Latitude,
      longitude: locationUser.Longitude,
    };
    const apiUrl = `https://router.project-osrm.org/route/v1/driving/${point1.longitude},${point1.latitude};${point2.longitude},${point2.latitude}?overview=false`; //جلب المسافة والمدة بين نقطتين
    // const apiUrl=`https://router.project-osrm.org/route/v1/driving/${point1.longitude},${point1.latitude};${point2.longitude},${point2.latitude}?steps=true`;//تفاصيل النقاط على الطريق
    axios
      .get(apiUrl)
      .then(async (response) => {
        const data = response.data;
        req.body.priceDelivery = data.routes[0].distance * 0.02 || 20;
        req.body.duration =
          Math.ceil(data.routes[0].duration / 60) + Math.random() * 120; //اضفة رقم عشوئي يمثل الذمن المتوقع لتحضير الطلب
        req.body.total += req.body.priceDelivery;
        req.body.user = req.user._id;
        const doc = await Order.create(req.body);
        res.status(200).json({
          status: "success",
          doc,
        });
      })
      .catch((error) => {
        res.status(400).json({ status: "errors", message: error.message });
      });
  } else {
    req.body.priceDelivery = 0;
    req.body.duration = Math.random() * 120; ////اضفة رقم عشوئي يمثل الذمن المتوقع لتحضير الطلب
    req.body.user = req.user._id;
    const doc = await Order.create(req.body);
    res.status(200).json({
      status: "success",
      doc,
    });
  }
});
exports.updateOrderErr = catchAsync(async (req, res, next) => {
  const thisBranch = await Branch.findById(req.body.branch);
  req.body.total = 0;
  let thisProduct;
  if (req.body.statuspaid == "نقدي") {
    req.body.paid = true;
  }
  for (let i = 0; i < req.body.cart.length; i++) {
    thisProduct = await Product.findById(req.body.cart[i].product);
    if (!thisProduct) return next(new AppError("Product is not defind", 400));
    req.body.cart[i] = {
      product: req.body.cart[i].product,
      quantity: req.body.cart[i].quantity,
      price: thisProduct.price * req.body.cart[i].quantity,
    };
    req.body.total += thisProduct.price * req.body.cart[i].quantity;
  }
  /////////////////////////////////////////////يتطلب اتصال بشبكة//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (req.body.whisstatus) {
    const locationBranch = await Location.findById(thisBranch.location);
    const locationUser = await Location.findById(req.body.location);
    if (!locationBranch || !locationUser)
      return next(new AppError("Location is not defund", 400));
    // تعيين إحداثيات النقطتين
    const point1 = {
      latitude: locationBranch.Latitude,
      longitude: locationBranch.Longitude,
    };
    const point2 = {
      latitude: locationUser.Latitude,
      longitude: locationUser.Longitude,
    };
    const apiUrl = `https://router.project-osrm.org/route/v1/driving/${point1.longitude},${point1.latitude};${point2.longitude},${point2.latitude}?overview=false`; //جلب المسافة والمدة بين نقطتين
    // const apiUrl=`https://router.project-osrm.org/route/v1/driving/${point1.longitude},${point1.latitude};${point2.longitude},${point2.latitude}?steps=true`;//تفاصيل النقاط على الطريق
    axios
      .get(apiUrl)
      .then(async (response) => {
        const data = response.data;
        req.body.priceDelivery = data.routes[0].distance * 0.02 || 20;
        req.body.duration =
          Math.ceil(data.routes[0].duration / 60) + Math.random() * 120; //اضفة رقم عشوئي يمثل الذمن المتوقع لتحضير الطلب

        req.body.total += req.body.priceDelivery;
        req.body.user = req.user._id;
        const doc = await Order.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
          status: "success",
          doc,
        });
      })
      .catch((error) => {
        res.status(400).json({ status: "errors", message: error.message });
      });
  }
  /////////////////////////////////////////////بدون اتصال///////////////////////////////////////////////////
  else {
    req.body.cart = arrcart;
    req.body.priceDelivery = 0;
    req.body.duration = Math.random() * 120; //اضفة رقم عشوئي يمثل الذمن المتوقع لتحضير الطلب
    req.body.user = req.user._id;
    const doc = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      doc,
    });
  }
});
exports.chekOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.findById(req.params.id);
  if (doc.paid == true || Date.now() - doc.createdAt > 10 * 60 * 1000)
    return next(new AppError("لقد تجاوزت الوقت المسموح لتعديل الطلب", 400));
  next();
});
exports.statisticsWithLinkUser = factory.statisticsWithLink(
  Order,
  "total",
  "users",
  "user",
  "user.name",
  "user.phone",
  "user.email"
);
//كود الاحصائيات بدون تابع
// catchAsync(async (req, res, next) => {
//   const doc = await Order.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "user",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         "user.name": 1,
//         "user.phone": 1,
//         "user.email": 1,
//         priceDelivery: 1,
//         year: { $year: "$createdAt" },
//         month: { $month: "$createdAt" },
//         day: { $dayOfMonth: "$createdAt" },
//       },
//     },
//     {
//       $match: { year: +req.params.year, month: +req.params.month },
//     },
//     {
//       $group: {
//         _id: "$user",
//         totalOrders: { $sum: 1 },
//         totalPrice: { $sum: "$priceDelivery" },
//         avglPrice: { $avg: "$priceDelivery" },
//         maxlPrice: { $max: "$priceDelivery" },
//         minlPrice: { $min: "$priceDelivery" },
//       },
//     },
//   ]);
//   res.status(200).json({
//     status: "success",
//     doc,
//   });
// });
// });
