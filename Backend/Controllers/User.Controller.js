const Users = require("../Models/User.Model");
const Booking = require("../Models/Booking.Model");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { userregister } = require("../../WEB/controllers/User.Controller");

//register
exports.addUser = async (req, res) => {
	try {
		const find = await Users.find({ Email: req.body.Email });

		const validationSchema = Joi.object({
			FullName: Joi.string().min(4).required(),
			Address: Joi.string().min(5).required(),
			ContactNumber: Joi.string().length(11).required(),
			Email: Joi.string().min(8).required().email(),
			Password: Joi.string()
				.required()
				.pattern(new RegExp("^([A-Z])(?=.*?[a-z])(?=.*?[0-9]).{7,}$")),
		});

		const { error } = validationSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		//salt and hashed password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.Password, salt);

		//search if email is already in use
		if (find.length >= 1) {
			return res.status(403).send({ message: "Email is already existing" });
		} else {
			const user = new Users({
				FullName: req.body.FullName,
				Address: req.body.Address,
				ContactNumber: req.body.ContactNumber,
				Email: req.body.Email,
				Password: hashedPassword,
			});

			const saveUser = await user.save();
			// res.send({
			//   user: user._id,
			//   message: `${req.body.FullName} is successfully created.`,
			// });
			return res.status(200).send({
				message: "Successfully Created!",
				status: 200,
				data: saveUser,
			});
		}
	} catch (err) {
		return res.status(400).send(err.message);
	}
};
//login
exports.userLogin = async (req, res) => {
	try {
		const validation = Joi.object({
			Email: Joi.string().required().min(2),
			Password: Joi.string().required(),
		});

		// Request Validations
		const { error } = validation.validate(req.body);
		if (error)
			return res.status(400).send({
				message: error.details[0].message,
				statusCode: 400,
			});

		// Check if email exists
		const User = await Users.findOne({ Email: req.body.Email });
		if (!User)
			return res.status(404).send({
				message: `User not found`,
				statusCode: 404,
			});

		// Check if password valid
		const validPass = await bcrypt.compare(req.body.Password, User.Password);
		if (!validPass)
			return res.status(403).send({
				message: ` Incorrect Email or password`,
				statusCode: 403,
			});

		// Create and assign token
		const payload = {
			_id: User._id,
			username: User.username,
			role: User.role,
		};

		const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "1d",
		});

		return res.status(200).header("authToken", token).send({
			token: token,
			_id: User._id,
			logged_in: "Yes",
			message: `User verified`,
			statusCode: 200,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: err.message, statusCode: 400 });
	}
};

//get user by id
exports.getUserInfo = async (req, res) => {
	try {
		const getInfo = await Users.findById(req.params._id);
		return res
			.status(200)
			.json({ message: "User Retrived", data: getInfo, statusCode: 200 });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: err.message, statusCode: 400 });
	}
};
//get all user
exports.getUsers = async (req, res) => {
	try {
		const User = await Users.find();
		return res
			.status(200)
			.json({ data: User, message: "Get Users", status: 200 });
	} catch (err) {
		return res.status(400).json({ message: err.message, status: 400 });
	}
};
//update user
exports.updateUser = async (req, res) => {
	try {
		const validationSchema = Joi.object({
			FullName: Joi.string().min(4).required(),
			Address: Joi.string().min(5).required(),
			Password: Joi.string()
				.required()
				.pattern(new RegExp("^([A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")),
		});
		const { error } = validationSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.Password, salt);
		const updateUser = await Users.updateMany(
			{ _id: req.params.User_id },
			{
				FullName: req.body.FullName,
				Address: req.body.Address,
				Password: hashedPassword,
			}
		);
		return res
			.status(200)
			.json({ data: updateUser, message: "User Updated", status: 200 });
	} catch (err) {
		return res.status(400).json({ message: err.message, status: 400 });
	}
};

//notifAccept
exports.notificationAccept = async (req, res) => {
	try {
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
		const RequestTypeStats = "Accepted";
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
		return res.status(200).json({ message: "Notification Sent!", status: 200 });
	} catch (error) {
		console.log(error);
	}
};

//notificationDecline
exports.notificationDecline = async (req, res) => {
	try {
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
		const RequestTypeStats = "Declined";
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
		return res.status(200).json({ message: "Notification Sent!", status: 200 });
	} catch (error) {
		console.log(error);
	}
};

//getllNotif

exports.getNotification = async (req, res) => {
	try {
		const getNotif = await Users.findById(req.params._id);

		return res.status(200).json({
			message: "Booking Retrived",
			data: getNotif.Notification,
			statusCode: 200,
		});
	} catch (err) {
		console.log(err);
	}
};
