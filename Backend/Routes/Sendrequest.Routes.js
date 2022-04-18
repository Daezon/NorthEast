const express = require('express');
const router = express.Router();

const verify = require('../Controllers/Verifytoken.Controllers');

const SendRequestController = require('../Controllers/Sendrequest.Controller');

router.post('/sendrequest', verify, SendRequestController.sendrequestService);

router.get('/getRequest', SendRequestController.getRequest);

router.get('/getRequest/:_id', SendRequestController.idgetRequest);

router.delete('/deleteRequest/:_id', SendRequestController.deleteRequest);

router.put('/updateRequest', SendRequestController.updateRequest);

router.get('/getapprove', SendRequestController.getApprove);

router.get('/getdeclined', SendRequestController.getDeclined);

router.get('/getdefault', SendRequestController.getDefault);

router.get('/getDone', SendRequestController.getDone);

router.get('/getCancelled', SendRequestController.getCancelled);

router.get('/getArchieve', SendRequestController.getArchieve);

module.exports = router;
