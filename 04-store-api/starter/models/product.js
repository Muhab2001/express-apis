const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided"],
  },
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  //   to limit possible input to certain values
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
    //   curly braces to access the user input
      message: "{VALUE} is not supported"
    },
    //   enum: ["ikea", "liddy", "caressa", "marcos"] alternative with no err msg
  },
});

module.exports = mongoose.model("Products", productSchema)