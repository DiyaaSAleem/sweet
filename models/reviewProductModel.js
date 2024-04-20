const mongoose = require("mongoose");
const Product = require("./productModel");
const reviewProductSchema = new mongoose.Schema(
  {
    review: {
      type: String,
        required: [true, "التقييم للطلب يجب أن لا يكون فارغ"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "المراجعة يجب أن تنتمي لمنتج."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "المراجعة يجب أن تنتمي لمستخدم"],
    },
  },
  { timestamps: true }
);

reviewProductSchema.post("save", async (doc) => {
  let thisproduct = await Product.findById(doc.product);
  thisproduct.ratingsQuantity++;
  thisproduct.ratingsAverage =
    (thisproduct.ratingsAverage * (thisproduct.ratingsQuantity - 1) +
      doc.rating) /
    thisproduct.ratingsQuantity;
  await thisproduct.save();
});
const ReviewProduct = mongoose.model("ReviewProduct", reviewProductSchema);
module.exports = ReviewProduct;
