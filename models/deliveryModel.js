const mongoose = require("mongoose");
const deliverySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    branch: {
      type: mongoose.Schema.ObjectId,
      ref: "Branch",
      required: [true, "يجب ادخال الفرع الموجود به المنتج"],
    },
    // work_hours: {
    //   type: Number,
    //   required: [true, "delivery must have work hours"],
    // },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      required: [true, "يجب ادخال رقم هاتف"],
      validate: {
        validator: (el) => {
          /(\+963\d{9}|09\d{8})/.test(el);
        },
        message: "الرقم غير صحيح",
      },
    },
  },
  {
    timestamps: true,
  }
);
const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;
