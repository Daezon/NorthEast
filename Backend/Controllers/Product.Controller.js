const Product = require('../Models/Product.Models');
const Joi = require('joi');

//addProduct
exports.addProduct = async (req, res) => {
  try {
    const find = await Product.find({ Productname: req.body.Productname });
    // const validationSchema = Joi.object({
    //   Productname: Joi.string().required(),
    //   Price: Joi.string().required(),
    // });
    // const { error } = validationSchema.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    if (find.length >= 1) {
      return res.status(403).send({ message: 'Product is already existing' });
    } else {
      const Image = req.body.image_product;
      const finalImage = Image.slice(6, Image.length);
      console.log(finalImage);
      const product = new Product({
        Productname: req.body.Productname,
        Image: finalImage,
        Price: req.body.Price,
      });
      const saveproduct = await product.save();
      return res.status(200).send(saveproduct);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
//update product
exports.updateProduct = async (req, res) => {
  try {
    const find = await Product.find({ Productname: req.body.Productname });
    // const validationSchema = Joi.object({
    //   Productname: Joi.string().required(),
    //   Image: Joi.string().required(),
    //   Price: Joi.string().required(),
    // });
    // const { error } = validationSchema.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    if (find.length >= 1) {
      return res.status(403).send({ message: 'Product is already existing' });
    } else {
      // const Image = req.body.image_product;
      // console.log(req);
      const image = req.body.image_product;

      console.log(image);
      const finalImage = image.slice(6, image.length);
      console.log(finalImage);
      const updateProduct = await Product.updateMany(
        { _id: req.params.Product_id },
        {
          Productname: req.body.Productname,
          Image: finalImage,
          Price: req.body.Price,
        }
      );
      return res
        .status(200)
        .json({ data: updateProduct, message: 'Product Updated', status: 200 });
    }
  } catch (err) {
    console.log();
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
//deleteproduct
exports.deleteProduct = async (req, res) => {
  try {
    const removeProduct = await Product.deleteOne({
      _id: req.params.Product_id,
    });
    return res
      .status(200)
      .json({ data: removeProduct, message: 'Product Removed', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get all product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    return res
      .status(200)
      .json({ data: product, message: 'Get Product', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.getProductID = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params._id });
    return res
      .status(200)
      .json({ data: product, message: 'Get Product', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
