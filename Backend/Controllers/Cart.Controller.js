const Cart = require("../Models/Cart.Model");
const axios = require("axios");
const { ms, s, m, h, d } = require("time-convert");
const HumanToMilliseconds = require("human-to-milliseconds");
const prettyMilliseconds = require("pretty-ms");

//add to cart
exports.addToCart = async (req, res) => {
	try {
		const serviceurl = await axios.get(
			`https://api.northeastcarcare.me/api/services/${req.params._id}`
		);
		const findClientid = await Cart.find({ Clientid: req.User._id });
		const serviceName = serviceurl.data.data.Servicename;
		const isContain = findClientid.find(
			(cart) => cart.serviceName === serviceName && cart.carttype === "Oncart"
		);

		if (isContain) {
			return res.status(403).send({ message: "Already added" });
		} else {
			const carttype = "Oncart";
			const cart = new Cart({
				Clientid: req.User._id,
				serviceName: serviceurl.data.data.Servicename,
				serviceTime: serviceurl.data.data.Time,
				serviceImage: serviceurl.data.data.Image,
				carttype: carttype,
			});

			const saveCart = await cart.save();
			return res.status(200).json({
				message: "Added",
				data: saveCart,
				statusCode: 200,
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: err.message, statusCode: 400 });
	}
};

//getallcartbyuserid
exports.getCart = async (req, res) => {
	try {
		const Clientid = req.params._id;
		const cart = await Cart.find({
			Clientid: Clientid,
			carttype: "Oncart",
		});

		return res.status(200).json({
			message: "My cart",
			data: cart,
			statusCode: 200,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: error.message, statusCode: 400 });
	}
};

//updatecart
exports.updateCart = async (req, res) => {
	try {
		const Clientid = req.params._id;
		const updateClientCart = await Cart.updateMany(
			{ Clientid: Clientid },
			{ carttype: "onRequest" }
		);

		return res.status(200).json({
			message: "Updated!",
			data: updateClientCart,
			statusCode: 200,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: err.message, statusCode: 400 });
	}
};

//deletecart
exports.deleteCart = async (req, res) => {
	const id = req.params._id;
	console.log(id);
	await Cart.findByIdAndDelete(id)
		.then((data) => {
			if (!data) {
				res
					.status(404)
					.send({ message: `Cannot DELETE with id ${id}. Maybe ID not found` });
			} else {
				res.send({
					message: "Item was DELETED succesfully!",
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete This Item with id=" + id,
			});
		});
};

//calculate duration
exports.duration = async (req, res) => {
	try {
		const Clientid = req.User._id;
		const carturl = await axios.get(
			`https://api.northeastcarcare.me/api/cart/${Clientid}`
		);
		const urlresult = await carturl.data.data;
		// console.log(urlresult);
		const arr = [];

		for (let i = 0; i < urlresult.length; i++) {
			const text = await urlresult[i].serviceTime;
			const removeSpace = text.replace(" ", "");
			const timeConvertMili = HumanToMilliseconds(`${removeSpace}`);
			arr.push(timeConvertMili);
		}
		console.log(arr);
		let sum = 0;
		for (let i = 0; i < arr.length; i++) {
			sum += parseInt(arr[i]);
		}

		const Duration = prettyMilliseconds(sum);

		return res.status(200).json({
			message: "Duration",
			data: Duration,
			statusCode: 200,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: err.message || "Error",
		});
	}
};
