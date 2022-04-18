var express = require('express');
var router = express.Router();

const UserController = require('../controllers/User.Controller');
// Get
router.get('/Register', UserController.register);
router.get('/LogIn', UserController.index);
router.get('/Services', UserController.customerServices);
router.get('/Booking', UserController.customerBooking);
router.get('/Notification', UserController.customerNotification);
router.get('/Products', UserController.customerProducts);
router.get('/Home', UserController.customerhome);
router.get('/TermsAndCondition', UserController.condition);
// Post
router.post('/Register', UserController.userregister);
router.post('/Login', UserController.userLogin);
router.post('/Booking', UserController.sendrequest);

module.exports = router;
