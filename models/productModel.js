const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.ObjectId,
      ref: "Branch",
      required: [true, "يجب ادخال الفرع الموجود به المنتج"],
    },
    category: {
      type: String,
      trim: true,
      required: [true, "يجب ادخال صنف المنتج"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "يجب ادخال اسم المنتج"],
    },
    image: {
      type: String,
      required: [true, "يجب ادخال صورة المنتج"],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "يجب ادخال سعر المنتج"],
    },
    size: {
      required: [true, "يجب ادخال حجم المنتج"],
      type: String,
      enum: ["صغير", "وسط", "كبير"],
      default: "وسط",
    },
    shape: {
      required: [true, "يجب ادخال شكل المنتج"],
      type: String,
      enum: ["صغير", "وسط", "كبير"],
      default: "وسط",
    },
    flavor: {
      required: [true, "يجب ادخال نكهة المنتج"],
      type: String,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      // set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
