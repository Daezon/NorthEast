const express = require('express');
const router = express.Router();
const verify = require('../Controllers/Verifytoken.Controllers');

const BookingController = require('../Controllers/Booking.Controller');


router.post('/getBooking', verify, BookingController.getbooking);

router.get('/booking', BookingController.getallBooking);

router.get('/booking/:_id', BookingController.idgetbooking)

// router.put('/booking/update/:_id',BookingController.updateBooking);

router.put('/approve/:_id', BookingController.updateAproBooking);

router.put('/decline/:_id', BookingController.updateDecBooking);

router.put('/cancelled/:_id', BookingController.updateCanBooking);

router.put('/done/:_id', BookingController.updateDoneBooking);

router.get('/approve', BookingController.getApprove);

router.get('/decline', BookingController.getDeclined);

router.get('/default', BookingController.getDefault);

router.get('/done', BookingController.getDone);

router.get('/cancelled', BookingController.getCancelled);

router.get('/archieve', BookingController.getArchieve);


module.exports = router;