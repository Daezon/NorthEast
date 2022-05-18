const Booking = require("../Models/Booking.Model");
const axios = require("axios");

//getcartitem

exports.getbooking = async (req, res) => {
  try {
    //
    const toTimestamp = (strDate) => {
      const dt = Date.parse(strDate);
      return dt / 1000;
    };
    //   console.log(toTimestamp('05/18/2022 03:00:30'));
    //
    const Clientid = req.User._id;
    const carturl = await axios.get(
      `http://localhost:8080/api/cart/${Clientid}`
    );

    const cartArr = await carturl.data.data;

    const humanTime = req.body.Time;
    const humanDate = req.body.Date;

    const scheduledTime = toTimestamp(`${humanDate} ${humanTime}`);
    console.log(scheduledTime);
    const findDate = await Booking.find({ Schedule: scheduledTime });
    console.log(findDate);

    if (findDate.length >= 1) {
      return res
        .status(403)
        .send({ message: "Scheduled time is Already Taken!" });
    } else {
      const sendBooking = new Booking({
        FullName: req.body.FullName,
        CarMileage: req.body.CarMileage,
        ContactNumber: req.body.ContactNumber,
        CarandModel: req.body.CarandModel,
        Schedule: scheduledTime,
        RequestType: req.body.RequestType,
      });
      const saveBooking = await sendBooking.save();

      for (let i = 0; i < cartArr.length; i++) {
        await Booking.findOneAndUpdate(
          {
            FullName: req.body.FullName,
          },
          {
            $addToSet: {
              cart: cartArr[i],
            },
          }
        );
      }
      // update the cart type

      return res.status(200).send(saveBooking);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

//getall
exports.getallBooking = async (req, res) => {
  try {
    const allBooking = await Booking.find();
    return res.status(200).json({
      data: allBooking,
      message: "All Booking",
      status: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//getbyid
exports.idgetbooking = async (req, res) => {
  try {
    const idgetbooking = await Booking.findById(req.params._id);
    return res.status(200).json({
      message: "Booking Retrived",
      data: idgetbooking,
      statusCode: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

//update
exports.updateCanBooking = async (req, res) => {
  try {
    const cancell = "Cancelled";

    const updateBooking = await Booking.updateOne(
      { _id: req.params._id },
      {
        RequestType: cancell,
      }
    );
    return res
      .status(200)
      .json({ data: updateBooking, message: "Booking Updated", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//updateApprove
exports.updateAproBooking = async (req, res) => {
  try {
    const accept = "Accept";

    const updateBooking = await Booking.updateOne(
      { _id: req.params._id },
      {
        RequestType: accept,
      }
    );
    return res
      .status(200)
      .json({ data: updateBooking, message: "Booking Updated", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//updateDecline
exports.updateDecBooking = async (req, res) => {
  try {
    const decline = "Decline";

    const updateBooking = await Booking.updateOne(
      { _id: req.params._id },
      {
        RequestType: decline,
      }
    );
    return res
      .status(200)
      .json({ data: updateBooking, message: "Booking Updated", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//updateDone

exports.updateDoneBooking = async (req, res) => {
  try {
    const done = "Done";

    const updateBooking = await Booking.updateOne(
      { _id: req.params._id },
      {
        RequestType: done,
      }
    );
    return res
      .status(200)
      .json({ data: updateBooking, message: "Booking Updated", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get Approve

exports.getApprove = async (req, res) => {
  try {
    const allReq = await Booking.find();
    const approveArr = [];
    for (let i = 0; i < allReq.length; i++) {
      if (allReq[i].RequestType === "Accept") {
        approveArr.push(allReq[i]);
      }
    }
    return res
      .status(200)
      .json({ data: approveArr, message: "Get All Accept", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//getdecline
exports.getDeclined = async (req, res) => {
  try {
    const allDec = await Booking.find();
    const declineArr = [];
    for (let i = 0; i < allDec.length; i++) {
      if (
        allDec[i].RequestType === "Decline" ||
        allDec[i].RequestType === "decline"
      ) {
        declineArr.push(allDec[i]);
      }
    }
    return res
      .status(200)
      .json({ data: declineArr, message: "Get All Declined", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get default
exports.getDefault = async (req, res) => {
  try {
    const allDefault = await Booking.find();
    const defaultArr = [];
    for (let i = 0; i < allDefault.length; i++) {
      if (allDefault[i].RequestType === "Default") {
        defaultArr.push(allDefault[i]);
      }
    }
    return res
      .status(200)
      .json({ data: defaultArr, message: "Get All Default", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get done
exports.getDone = async (req, res) => {
  try {
    const allDone = await Booking.find();
    const doneArr = [];
    for (let i = 0; i < allDone.length; i++) {
      if (allDone[i].RequestType === "Done") {
        doneArr.push(allDone[i]);
      }
    }
    return res
      .status(200)
      .json({ data: doneArr, message: "Get All Done", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//get canceled
exports.getCancelled = async (req, res) => {
  try {
    const allCancelled = await Booking.find();
    const CancelledArr = [];
    for (let i = 0; i < allCancelled.length; i++) {
      if (allCancelled[i].RequestType === "Cancelled") {
        CancelledArr.push(allCancelled[i]);
      }
    }
    return res
      .status(200)
      .json({ data: CancelledArr, message: "Get All Cancelled", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//getArhieve
exports.getArchieve = async (req, res) => {
  try {
    const allArchieve = await Booking.find();
    const ArchieveArr = [];
    for (let i = 0; i < allArchieve.length; i++) {
      if (
        allArchieve[i].RequestType === "Cancelled" ||
        allArchieve[i].RequestType === "Done" ||
        allArchieve[i].RequestType === "Decline"
      ) {
        ArchieveArr.push(allArchieve[i]);
      }
    }
    return res
      .status(200)
      .json({ data: ArchieveArr, message: "Get All Archieve", status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
exports.updateCartType = async (req, res) => {
  try {
    const booking = await axios.get(
      `http://localhost:8080/api/Booking/${req.params._id}`
    );
    console.log(booking.data);
  } catch (e) {
    console.log(e);
  }
};
