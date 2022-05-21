const Booking = require("../Models/Booking.Model");
const Cart = require("../Models/Cart.Model");
const axios = require("axios");
const HumanToMilliseconds = require("human-to-milliseconds");
const prettyMilliseconds = require("pretty-ms");
const timestampToDate = require("timestamp-to-date");
//getcartitem
const Converter = require("timestamp-conv");

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
				RequestType: req.body.RequestType,
			});
			const saveBooking = await sendBooking.save();

			await Cart.updateMany({ Clientid: Clientid }, { carttype: "onRequest" });

			return res.status(200).send(saveBooking);
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
