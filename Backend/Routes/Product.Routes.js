const express = require('express');
const router = express.Router();
const multer = require('multer');

const ProductController = require('../Controllers/Product.Controller');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../WEB/public/assets/image_product');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});
const upload = multer({ storage: imageStorage });

// router.post(
//   '/addproduct',
//   upload.single('image_product'),
//   ProductController.addProduct
// );

router.post('/addproduct', ProductController.addProduct);

router.get('/product', ProductController.getProduct);
router.get('/product/:_id', ProductController.getProductID);
router.put(
  '/product/update/:Product_id',
  upload.single('image_product'),
  ProductController.updateProduct
);

router.delete(
  '/product/delete/:Product_id',
  // verify ,
  ProductController.deleteProduct
);

module.exports = router;
