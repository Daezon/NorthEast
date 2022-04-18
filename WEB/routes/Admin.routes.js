var express = require('express');
var router = express.Router();
const multer = require('multer');

const AdminController = require('../controllers/Admin.Controller');

//upload Service
const imageStorageService = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/assets/image_service');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});
const upload = multer({ storage: imageStorageService });

//upload img Service
router.post(
  '/Admin/AddService',
  upload.single('image_service'),
  AdminController.AdminAddService
);
//

//upload Product
const imageStorageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/assets/image_product');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});
const uploadProduct = multer({ storage: imageStorageProduct });

//upload img product
router.post(
  '/Admin/AddProduct',
  uploadProduct.single('image_product'),
  AdminController.AdminAddProduct
);
//

//Update Product

//Update img product
router.post(
  '/admin/Updateproduct',
  uploadProduct.single('image_product'),
  AdminController.imageUpdateproduct
);
//

//Update img service
router.post(
  '/admin/Updateservice',
  uploadProduct.single('image_service'),
  AdminController.imageUpdateservice
);
//

router.get('/Admin/AddService', AdminController.renderAddService);
router.get('/Admin/AddProduct', AdminController.renderAddProduct);
router.get('/Admin/Archive', AdminController.AdminArchive);
router.get('/Admin/Home', AdminController.AdminHome);
router.get('/Admin/Products', AdminController.AdminProducts);
router.get('/Admin/Request', AdminController.AdminRequest);
router.get('/Admin/Services', AdminController.AdminServices);
router.get('/Admin/UserAccounts', AdminController.AdminUserAccount);
router.get('/Admin/Schedules', AdminController.AdminSchedules);
router.get('/Admin/Updateproduct', AdminController.Updateproduct);
router.get('/Admin/Updateservice', AdminController.Updateservice);

module.exports = router;
