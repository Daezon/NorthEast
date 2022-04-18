const RequestService = require('../Models/Sendrequest.Model');
const Joi = require('joi');

//send Request
exports.sendrequestService = async (req, res) => {
  try {
    const newRequest = new RequestService({
      FullName: req.body.FullName,
      CarMileage: req.body.CarMileage,
      ContactNumber: req.body.ContactNumber,
      Services: req.body.Services,
      CarandModel: req.body.CarandModel,
      Day: req.body.Day,
      Time: req.body.Time,
      RequestType: req.body.RequestType,
    });
    const saveRequest = await newRequest.save();
    return res.status(200).send(saveRequest);
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get all request
exports.getRequest = async (req, res) => {
  try {
    const savesendrequestService = await RequestService.find();
    return res.status(200).json({
      data: savesendrequestService,
      message: 'Get All Request',
      status: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
//get request by id
exports.idgetRequest = async (req, res) => {
  try {
    const getidRequest = await RequestService.findById(req.params._id);
    return res.status(200).json({
      message: 'Request Retrived',
      data: getidRequest,
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

//deleterequest
exports.deleteRequest = async (req, res) => {
  try {
    const removeRequest = await RequestService.deleteOne({
      _id: req.params.RequestService_id,
    });
    return res
      .status(200)
      .json({ data: removeRequest, message: 'Request Removed', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { requestID, RequestType } = req.body;
    console.log(requestID, RequestType);
    const upadateReq = await RequestService.updateOne(
      { _id: requestID },
      {
        RequestType: RequestType,
      }
    );
    return res
      .status(200)
      .json({ data: upadateReq, message: 'Request Upadated', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get approve
exports.getApprove = async (req, res) => {
  try {
    const allReq = await RequestService.find();
    const approveArr = [];
    for (let i = 0; i < allReq.length; i++) {
      if (allReq[i].RequestType === 'Accept') {
        approveArr.push(allReq[i]);
      }
    }
    return res
      .status(200)
      .json({ data: approveArr, message: 'Get All Accept', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get decline
exports.getDeclined = async (req, res) => {
  try {
    const allDec = await RequestService.find();
    const declineArr = [];
    for (let i = 0; i < allDec.length; i++) {
      if (
        allDec[i].RequestType === 'Decline' ||
        allDec[i].RequestType === 'decline'
      ) {
        declineArr.push(allDec[i]);
      }
    }
    return res
      .status(200)
      .json({ data: declineArr, message: 'Get All Declined', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
//get default
exports.getDefault = async (req, res) => {
  try {
    const allDefault = await RequestService.find();
    const defaultArr = [];
    for (let i = 0; i < allDefault.length; i++) {
      if (allDefault[i].RequestType === 'Default') {
        defaultArr.push(allDefault[i]);
      }
    }
    return res
      .status(200)
      .json({ data: defaultArr, message: 'Get All Default', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get done
exports.getDone = async (req, res) => {
  try {
    const allDone = await RequestService.find();
    const doneArr = [];
    for (let i = 0; i < allDone.length; i++) {
      if (allDone[i].RequestType === 'Done') {
        doneArr.push(allDone[i]);
      }
    }
    return res
      .status(200)
      .json({ data: doneArr, message: 'Get All Done', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get canceled
exports.getCancelled = async (req, res) => {
  try {
    const allCancelled = await RequestService.find();
    const CancelledArr = [];
    for (let i = 0; i < allCancelled.length; i++) {
      if (allCancelled[i].RequestType === 'Done') {
        CancelledArr.push(allCancelled[i]);
      }
    }
    return res
      .status(200)
      .json({ data: CancelledArr, message: 'Get All Cancelled', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

exports.getArchieve = async (req, res) => {
  try {
    const allArchieve = await RequestService.find();
    const ArchieveArr = [];
    for (let i = 0; i < allArchieve.length; i++) {
      if (
        allArchieve[i].RequestType === 'Cancelled' ||
        allArchieve[i].RequestType === 'Done' ||
        allArchieve[i].RequestType === 'Decline'
      ) {
        ArchieveArr.push(allArchieve[i]);
      }
    }
    return res
      .status(200)
      .json({ data: ArchieveArr, message: 'Get All Archieve', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
