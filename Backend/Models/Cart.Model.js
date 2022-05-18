const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  Clientid: {
    type: String,
  },

  serviceName: {
    type: String,
  },

  serviceTime: {
    type: String,
  },

  serviceImage: {
    type: String,
  },

  carttype: {
    type: String,
  },
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
