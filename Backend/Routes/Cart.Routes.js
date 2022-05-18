const express = require("express");
const router = express.Router();
const verify = require("../Controllers/Verifytoken.Controllers");

const CartController = require("../Controllers/Cart.Controller");

router.post("/cart/:_id", verify, CartController.addToCart);

router.get("/cart/:_id", CartController.getCart);

router.get("/updatecart", verify, CartController.updateCart);

router.delete("/itemdelete/:_id", CartController.deleteCart);

router.get("/duration", verify, CartController.duration);

module.exports = router;
