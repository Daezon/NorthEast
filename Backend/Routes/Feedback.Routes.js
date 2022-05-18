const express = require('express');
const router = express.Router();
const verify = require('../Controllers/Verifytoken.Controllers');

const feedBackController = require('../Controllers/FeedBack.Controller');



router.post('/feedback',verify, feedBackController.feedBackComment);

router.get('/feedback', feedBackController.getFeedback)


module.exports = router;