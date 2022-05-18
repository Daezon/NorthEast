const express = require('express');
const router = express.Router();
const multer = require('multer');

const ServiceController = require('../Controllers/Services.Controllers');

const imageStorageService = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './image_services');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});
const upload = multer({ storage: imageStorageService });

router.post(
  '/addservice',
  upload.single('image_service'),
  ServiceController.addService
);

// router.post('/addservice', ServiceController.addService);
router.get('/try', ServiceController.serviceTry)
router.get('/services/:_id', ServiceController.getServiceID);
router.get('/services', ServiceController.getService);
router.put(
  '/service/update/:Service_id',
  upload.single('image_service'),
  ServiceController.updateService
);

router.delete(
  '/service/delete/:Service_id',
  //   verify
  ServiceController.deleteService
);

module.exports = router;
