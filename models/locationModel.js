const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  Longitude: {
    type: Number,
    required: [true, "يجب إدخال خط الطول"],
  },
  Latitude: {
    type: Number,
    required: [true, "يجب إدخال خط العرض"],
  },
  region: {
    type: String,
    required: [true, "يجب إدخال المنطقة"],
  },
  street: {
    type: String,
    required: [true, "يجب إدخال الشارع"],
  },
});
const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
