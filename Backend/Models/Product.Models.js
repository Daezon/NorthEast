const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  Productname: {
    type: String,
    required: true,
    min: 5,
  },
  Image: {
    type: String,
  //   fieldname: String,
  // originalname: String,
  // encoding: String,
  // mimetype: String,
  // destination: String,
  // filename: String,
  // path: String,
  // size: Number
  },
  Price: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;