const mongoose = require("mongoose");
const Order = require("./orderModel");
const extesionSchema = new mongoose.Schema(
  {
    photo: {
      required: [true, "يجب ادخال الصورة التي تريد اضافتها على الحلوة او الكيكة"],
      type: String,
    },
    description: {
      required: [true, "يجب إدخال وصف حول هذه الإضافة"],
      type: String,
    },
    order: {
      required: [true, "يجب إدخال الطلب الذي تريد عليه الاضافة"],
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
    quantity: {
      required: [true, "يجب ادخال الكمية"],
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
extesionSchema.post("save", async (doc) => {
  let thisOrder = await Order.findById(doc.order);
  thisOrder.total += doc.quantity * 2000; //اضافة الكلفة الاضافية الى المجموع
  thisOrder.priceExtesion += doc.quantity * 2000; //اضافة 2000كلفة اضافية لتحضير كل صورة على الحلوة او الكيك
  thisOrder.duration += doc.quantity * 60; //اضافة ساعة لتحضير كل صورة على الحلوة او الكيك
  thisOrder.save();
});
const Extesion = mongoose.model("Extesion", extesionSchema);
module.exports = Extesion;
