const Cart = require("../Models/Cart.Model");
const axios = require("axios");
const { ms, s, m, h, d } = require("time-convert");
const HumanToMilliseconds = require("human-to-milliseconds");
const prettyMilliseconds = require("pretty-ms");

//add to cart
exports.addToCart = async (req, res) => {
  try {
    const serviceurl = await axios.get(
      `http://localhost:8080/api/services/${req.params._id}`
    );

    const findClientid = await Cart.find({ Clientid: req.User._id });
    const findserviceName = await Cart.find({
      serviceName: serviceurl.data.data.Servicename,
    });
    const findCarttype = await Cart.find({ carttype: "Oncart" });
    console.log(findClientid, findserviceName, findCarttype);
    if (
      findCarttype.length >= 1 &&
      findClientid.length >= 1 &&
      findserviceName.length >= 1
    ) {
      return res.status(403).send({ message: "Already added" });
    } else {
      const carttype = "Oncart";
      const cart = new Cart({
        Clientid: req.User._id,
        serviceName: serviceurl.data.data.Servicename,
        serviceTime: serviceurl.data.data.Time,
        serviceImage: serviceurl.data.data.Image,
        carttype: carttype,
      });

      const saveCart = await cart.save();
      return res.status(200).json({
        message: "Added",
        data: saveCart,
        statusCode: 200,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

//getallcartbyuserid
exports.getCart = async (req, res) => {
  try {
    const Clientid = req.params._id;
    const cart = await Cart.find({
      Clientid: Clientid,
    });

    const arr = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].carttype === "Oncart") {
        arr.push(cart[i]);
      }
    }

    return res.status(200).json({
      message: "My cart",
      data: arr,
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

//update
exports.updateCart = async (req, res) => {
  try {
    const cartID = req.params._id;
    const updateCart = await Cart.updateOne(
      { _id: cartID },
      {
        carttype: "onRequest",
      }
    );
    return res.status(200).json({
      message: "Updated!",
      data: updateCart,
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

//deletecart

exports.deleteCart = async (req, res) => {
  const id = req.params._id;
  console.log(id);
  await Cart.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot DELETE with id ${id}. Maybe ID not found` });
      } else {
        res.send({
          message: "Item was DELETED succesfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete This Item with id=" + id,
      });
    });
};

//calculate duration
exports.duration = async (req, res) => {
  try {
    const Clientid = req.User._id;
    const carturl = await axios.get(
      `http://localhost:8080/api/cart/${Clientid}`
    );
    const urlresult = await carturl.data.data;
    // console.log(urlresult);
    const arr = [];

    for (let i = 0; i < urlresult.length; i++) {
      const text = await urlresult[i].serviceTime;
      const removeSpace = text.replace(" ", "");
      const timeConvertMili = HumanToMilliseconds(`${removeSpace}`);
      arr.push(timeConvertMili);
    }
    console.log(arr);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += parseInt(arr[i]);
    }

    const Duration = prettyMilliseconds(sum);

    return res.status(200).json({
      message: "Duration",
      data: Duration,
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Error",
    });
  }
};
