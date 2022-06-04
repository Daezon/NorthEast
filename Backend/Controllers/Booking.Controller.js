const Booking = require("../Models/Booking.Model");
const Cart = require("../Models/Cart.Model");
const axios = require("axios");
const HumanToMilliseconds = require("human-to-milliseconds");
const prettyMilliseconds = require("pretty-ms");
const timestampToDate = require("timestamp-to-date");
const Users = require("../Models/User.Model");
//getcartitem
const Converter = require("timestamp-conv");
const date = require("date-and-time");

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
    const findClientCart = await Cart.find({
      Clientid: Clientid,
      carttype: "Oncart",
    });
    const carturl = await axios.get(
      `http://localhost:8080/api/cart/${Clientid}`
    );

    const cartArr = await carturl.data.data;

    const humanTime = req.body.Time;
    const humanDate = req.body.Date;

    const scheduledTime = toTimestamp(`${humanDate} ${humanTime}`);
    console.log(scheduledTime);
    const findDate = await Booking.find({ Schedule: scheduledTime });
    const convertedTime = new Date(scheduledTime * 1000);
    const convertedDate = convertedTime.getDate();
    const convertedYear = convertedTime.getFullYear();
    const convertedMonth = convertedTime.getMonth() + 1;
    // date.format(now, "ddd, MMM DD YYYY");

    const complete = `${convertedMonth}-${convertedDate}-${convertedYear}`;

    const allTime = [];
    for (let i = 0; i < findClientCart.length; i++) {
      const text = await findClientCart[i].serviceTime;
      const removeSpace = text.replace(" ", "");
      const timeConvertMili = HumanToMilliseconds(`${removeSpace}`);
      allTime.push(timeConvertMili);
    }

    let totalTime = 0;
    for (let i = 0; i < allTime.length; i++) {
      totalTime += parseInt(allTime[i]);
    }

    const Duration = prettyMilliseconds(totalTime);

    if (findDate.length >= 1) {
      return res
        .status(403)
        .send({ message: "Scheduled time is Already Taken!" });
    } else {
      const sendBooking = new Booking({
        Clientid: Clientid,
        FullName: req.body.FullName,
        CarMileage: req.body.CarMileage,
        cart: findClientCart,
        ContactNumber: req.body.ContactNumber,
        CarandModel: req.body.CarandModel,
        Schedule: scheduledTime,
        ScheduleDate: complete,
        duration: Duration,
        time: humanTime,
        otherService: req.body.otherService,
        RequestType: req.body.RequestType,
      });
      const saveBooking = await sendBooking.save();

      await Cart.updateMany({ Clientid: Clientid }, { carttype: "onRequest" });

      return res.status(200).send({ saveBooking, message: "Request Sent" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

//getall
exports.getallBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();

    let allBookings = [];
    for (let i = 0; i < bookings.length; i++) {
      const findClientCart = await Cart.find({
        Clientid: bookings[i].Clientid,
      });
      const allTime = [];
      for (let i = 0; i < findClientCart.length; i++) {
        const text = await findClientCart[i].serviceTime;
        const removeSpace = text.replace(" ", "");
        const timeConvertMili = HumanToMilliseconds(`${removeSpace}`);
        allTime.push(timeConvertMili);
      }

      let totalTime = 0;
      for (let i = 0; i < allTime.length; i++) {
        totalTime += parseInt(allTime[i]);
      }

      const Duration = prettyMilliseconds(totalTime);
      allBookings.push({
        ...bookings[i],
        totalTime: Duration,
      });
    }
    console.log("allBookings", allBookings);
    return res.status(200).json({
      data: allBookings,
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
    const id = req.params._id;
    const url = await axios.get(`http://localhost:8080/api/booking/${id}`);
    const result = url.data.data;
    const userID = result.Clientid;
    // const titleResult = result.serviceName;

    const timestamp = Date.now();
    const date = new Date(timestamp);
    const datevalues = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ];
    const getYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const getDate = date.getDate();
    const getHours = date.getHours();
    const getMinutes = date.getMinutes();
    const finalDate = `${getYear}-${getMonth}-${getDate} ${getHours}:${getMinutes}`;

    console.log(userID);
    // const requestTypeResult = result.RequestType;
    const RequestTypeStats = "Accept";
    const message = `Your Request Schedule on ${finalDate} has been ${RequestTypeStats}`;

    const getDone = await Booking.updateOne(
      { _id: id },
      {
        RequestType: RequestTypeStats,
      }
    );

    await Users.findOneAndUpdate(
      {
        _id: userID,
      },
      {
        $addToSet: {
          Notification: [
            {
              // Title: titleResult,
              Message: message,
              Date: finalDate,
              reqType: RequestTypeStats,
            },
          ],
        },
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
    const id = req.params._id;
    const url = await axios.get(`http://localhost:8080/api/booking/${id}`);
    const result = url.data.data;
    const userID = result.Clientid;
    // const titleResult = result.serviceName;

    const timestamp = Date.now();
    const date = new Date(timestamp);
    const datevalues = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ];
    const getYear = date.getFullYear();
    const getMonth = date.getMonth() + 1;
    const getDate = date.getDate();
    const getHours = date.getHours();
    const getMinutes = date.getMinutes();
    const finalDate = `${getYear}-${getMonth}-${getDate} ${getHours}:${getMinutes}`;
    console.log(userID);
    // const requestTypeResult = result.RequestType;
    const RequestTypeStats = "Decline";
    const message = `Your Request Schedule on ${finalDate} has been ${RequestTypeStats}`;

    const getDecline = await Booking.updateOne(
      { _id: id },
      {
        RequestType: RequestTypeStats,
      }
    );

    await Users.findOneAndUpdate(
      {
        _id: userID,
      },
      {
        $addToSet: {
          Notification: [
            {
              // Title: titleResult,
              Message: message,
              Date: finalDate,
              reqType: RequestTypeStats,
            },
          ],
        },
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
exports.getPending = async (req, res) => {
  try {
    const allDefault = await Booking.find();
    const defaultArr = [];
    for (let i = 0; i < allDefault.length; i++) {
      if (allDefault[i].RequestType === "Pending") {
        defaultArr.push(allDefault[i]);
      }
    }
    console.log(defaultArr);
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
    console.log(doneArr);
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
exports.bookingCartUpdate = async (req, res) => {
  try {
    const bookingID = req.params._id;
    const getInfo = await Booking.find({ _id: bookingID });
    const cartLength = getInfo[0].cart;
    for (let i = 0; i < cartLength.length; i++) {
      const cartID = await cartLength[i];
      const updateCart = await axios.put(
        `http://localhost:8080/api/updatecart/${cartID}`
      );
    }
    return res.status(200).json({ message: "Item Updated", status: 200 });
  } catch (error) {
    console.log(error);
  }
};

//getAllTimew/Date

exports.getDates = async (req, res) => {
  try {
    const findDate = await Booking.distinct("ScheduleDate");

    let convertedDate = [];
    for (let i = 0; i < findDate.length; i++) {
      const newDate = new Date(findDate[i]);
      convertedDate.push(newDate.toString().substring(0, 15));
    }

    return res.status(200).json({
      message: "Booking Retrived",
      data: convertedDate,
      statusCode: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

const convertFrom24To12Format = (time24) => {
  const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
  const period = +sHours < 12 ? "AM" : "PM";
  const hours = +sHours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
};

exports.getDatewithTime = async (req, res) => {
  try {
    const dates = req.params.ScheduleDate;
    const dateObj = new Date(dates);
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate() + 1;
    const year = dateObj.getUTCFullYear();

    const final = `${day === 32 ? month + 1 : month}-${
      day === 32 ? 1 : day
    }-${year}`;

    const findTime = await Booking.find({ ScheduleDate: final });

    let convertedTime = [];
    for (i = 0; i < findTime.length; i++) {
      convertedTime.push({
        time: convertFrom24To12Format(findTime[i].time),
        duration: findTime[i].duration,
      });
    }

    return res.status(200).json({
      message: "Booking Retrived",
      data: convertedTime,
      statusCode: 200,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

exports.getBookingRequest = async (req, res) => {
  try {
    const clientBooking = await Booking.find({ Clientid: req.params._id }).sort(
      { Schedule: -1 }
    );
    if (clientBooking < 1) {
      return res.status(400).json({
        message: "No booking Yet",
        statusCode: 400,
      });
    } else {
      return res.status(200).json({
        message: "Booking Retrived",
        data: clientBooking,
        statusCode: 200,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
