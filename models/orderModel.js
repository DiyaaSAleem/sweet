const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.ObjectId,
      ref: "Branch",
      required: [true, "يجب دخال اسم الفرع"],
    },
    cart: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: {
          type: Number,
          required: [true, "المنتج يجب أن يكون له سعر"],
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "الطلب يجب أن يكون له مستخدم"],
    },
    withDelivery: {
      type: Boolean,
      default: false,
    },
    delivery: {
      type: mongoose.Schema.ObjectId,
      ref: "Delivery",
      default: null,
    },
    location: {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
      required: [true, "الفرع يجب أن يكون له موقع"],
    },
    priceExtesion: {
      type: Number,
      default: 0,
    },
    priceDelivery: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: [true, "الطلب يجب أن يكون لديه سعر إجمالي"],
    },
    duration: {
      type: Number,
    required: [true, "الطلب يجب أن يكون لديه مدة"],    },
    paidstatus: {
      type: String,
      required: true,
      enum: ["نقدي", "بنك", "سيريتل", "ام تي ان"],
      default: "نقدي",
    },
    status: {
      type: String,
      required: true,
      enum: ["تحضير", "توصيل", "مكتمل"],
      default: "تحضير",
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
