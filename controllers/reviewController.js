const Review = require("./../models/reviewModel");
const ReviewProduct = require("./../models/reviewProductModel");
const Branch = require("../models/branchModel");
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

// exports.getAllReviewsRes = catchAsync(async (req, res, next) => {
// const thisBranch = await Branch.findOne({ manger: req.user._id }, { _id: 1 });
//   const doc = await Review.aggregate([
//     {
//       $lookup: {
//         from: "orders",
//         localField: "order",
//         foreignField: "_id",
//         as: "order",
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "user",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     {
//       $lookup: {
//         from: "prodeucts",
//         localField: "order.cart.product",
//         foreignField: "_id",
//         as: "prodeuct",
//       },
//     },
//     {
//       $match: {
//         "order.branch": thisBranch._id,
//         type: "order",
//       },
//     },
//     {
//       $project: {
//         "user.name": 1,
//         "user.phone": 1,
//         review: 1,
//       },
//     },
//   ]);
//   res.status(200).json({
//     status: "success",
//     doc,
//   });
// });
exports.getAllReviewProduct = factory.getAllpop1(
  ReviewProduct,
  { path: "product" },
  { path: "user", select: "name phone" }
);
exports.getReviewProduct = factory.getOne(
  ReviewProduct,
  { path: "product" },
  { path: "user", select: "name phone" }
);
exports.createReviewProduct = factory.createOne(ReviewProduct);
exports.updateReviewProduct = factory.updateOne(ReviewProduct);
exports.deleteReviewProduct = factory.deleteOne(ReviewProduct);
