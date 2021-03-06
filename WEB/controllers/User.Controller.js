const { response } = require("express");
const fetch = require("node-fetch");
const URI = "https://api.northeastcarcare.me/api";
const { ms, s, m, h, d } = require("time-convert");

exports.register = async (req, res) => {
	res.render("customer/Register", {
		layout: "customer/Register",
	});
};

exports.index = async (req, res) => {
	res.render("customer/index", {
		layout: "customer/index",
	});
};

exports.customerServices = async (req, res) => {
	res.render("customer/customerServices", {
		layout: "customer/customerServices",
	});
};

exports.customerBooking = async (req, res) => {
	res.render("customer/customerBooking", {
		layout: "customer/customerBooking",
	});
};

exports.customerNotification = async (req, res) => {
	res.render("customer/customerNotification", {
		layout: "customer/customerNotification",
	});
};

exports.customerProducts = async (req, res) => {
	res.render("customer/customerProducts", {
		layout: "customer/customerProducts",
	});
};

exports.customerhome = async (req, res) => {
	res.render("customer/customerhome", {
		layout: "customer/customerhome",
	});
};

exports.condition = async (req, res) => {
	res.render("customer/condition", {
		layout: "customer/condition",
	});
};

exports.customerCart = async (req, res) => {
	res.render("customer/customerCart", {
		layout: "customer/customerCart",
	});
};

exports.customerFeedBack = async (req, res) => {
	res.render("customer/customerFeedBack", {
		layout: "customer/customerFeedBack",
	});
};

exports.customerTransactions = async (req, res) => {
	res.render("customer/customerTransactions", {
		layout: "customer/customerTransactions",
	});
};
//register
exports.userregister = async (req, res) => {
	const options = {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
		body: JSON.stringify({
			FullName: req.body.FullName,
			Address: req.body.Address,
			ContactNumber: req.body.ContactNumber,
			Email: req.body.Email,
			Password: req.body.Password,
		}),
	};

	const response = await fetch(`${URI}/user/register`, options);
	const resData = await response.json();
	// console.log(resData);
	if (response.status == 200) {
		res.render("customer/Register", {
			layout: "customer/Register",
			resData: resData,
			success: true,
		});
	} else {
		res.render("customer/Register", {
			layout: "customer/Register",
			resData: resData,
			success: true,
		});
	}
};

//Log in
exports.userLogin = async (req, res) => {
	try {
		const idData = await req.body.emailLogIn;
		if (
			idData.includes("ragamatocram@gmail12544553.com") ||
			idData.includes("admin123@gmail.com")
		) {
			const options = {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
					responseType: "json",
				},
				body: JSON.stringify({
					Email: req.body.emailLogIn,
					Password: req.body.passwordLogIn,
				}),
			};

			const response = await fetch(`${URI}/user/login`, options);
			const resData = await response.json();
			console.log(resData);
			if (response.status == 200) {
				res.cookie("authToken", resData.token, { maxAge: 24 * 60 * 60 * 1000 });
				res.cookie("adminId", resData._id, { maxAge: 24 * 60 * 60 * 1000 });
				res.render("admin/AdminHome", {
					layout: "admin/AdminHome",
					resData: resData,
					success: true,
					message: resData.message,
				});
			} else {
				res.render("customer/index", {
					layout: "customer/index",
					resData: resData,
					success: true,
				});
			}
		} else {
			const options = {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
					responseType: "json",
				},
				body: JSON.stringify({
					Email: req.body.emailLogIn,
					Password: req.body.passwordLogIn,
				}),
			};
			const response = await fetch(`${URI}/user/login`, options);
			const resData = await response.json();
			console.log(resData);
			if (response.status == 200) {
				res.cookie("authToken", resData.token, { maxAge: 24 * 60 * 60 * 1000 });
				res.cookie("userId", resData._id, { maxAge: 24 * 60 * 60 * 1000 });
				res.render("customer/customerhome", {
					layout: "customer/customerhome",
					resData: resData,
					success: true,
					message: resData.message,
				});
			} else {
				res.render("customer/index", {
					layout: "customer/index",
					resData: resData,
					success: true,
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
};

//Displaying Image Service Start
exports.customerServices = async (req, res) => {
	// const userId = req.cookies.userId;
	// console.log(userId);
	const options = {
		method: "GET",
		headers: {
			// Authorization: req.cookies.authToken,
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
	};
	const response = await fetch(`${URI}/services`, options);
	const resData = await response.json();
	console.log(resData);
	const { Servicename, Image, Time } = resData.data;
	res.render("customer/customerServices", {
		layout: "customer/customerServices",
		resData: resData,
	});
};
//Displaying Image Product End

//Displaying Image Product Start
exports.customerProducts = async (req, res) => {
	// const userId = req.cookies.userId;
	// console.log(userId);
	const options = {
		method: "GET",
		headers: {
			// Authorization: req.cookies.authToken,
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
	};
	const response = await fetch(`${URI}/product`, options);
	const resData = await response.json();
	console.log(resData);
	const { Productname, Image, Price } = resData.data;
	res.render("customer/customerProducts", {
		layout: "customer/customerProducts",
		resData: resData,
	});
};
//Displaying Image Service End

//Booking
exports.sendrequest = async (req, res) => {
	const token = await req.cookies.authToken;
	// console.log(req.cookies.authToken)
	const options = {
		method: "POST",
		headers: {
			authToken: token,
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
		body: JSON.stringify({
			FullName: req.body.FullName,
			CarMileage: req.body.CarMileage,
			ContactNumber: req.body.ContactNumber,
			CarandModel: req.body.CarandModel,
			RequestType: req.body.RequestType,
			Date: req.body.Day,
			Time: req.body.Time,
			otherService: req.body.otherService,
		}),
	};

	const response = await fetch(`${URI}/getBooking`, options);
	const resData = await response.json();
	console.log(resData);

	if (response.status == 200) {
		res.render("customer/customerBooking", {
			layout: "customer/customerBooking",
			resData: resData,
			success: true,
			message: resData.message,
		});
	} else {
		res.render("customer/customerBooking", {
			layout: "customer/customerBooking",
			resData: resData,
			success: true,
		});
	}
};
//End Booking

// timeView start
exports.customerTimeView = async (req, res) => {
	console.log("resData");
	const options = {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
	};
	const response = await fetch(`${URI}/getDate`, options);
	const resData = await response.json();

	console.log("resData", resData);

	const {} = resData.data;
	res.render("customer/customerBooking", {
		layout: "customer/customerBooking",
		dates: resData.data,
	});
};
// timeView end

// feedback post
exports.FeedBackComment = async (req, res) => {
	const token = await req.cookies.authToken;
	// console.log(req.cookies.authToken)
	const options = {
		method: "POST",
		headers: {
			authToken: token,
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
		body: JSON.stringify({
			Message: req.body.Message,
		}),
	};

	const response = await fetch(`${URI}/feedback`, options);
	const resData = await response.json();
	console.log(resData);
	message: resData.message;

	if (response.status == 200) {
		res.render("customer/customerFeedBack", {
			layout: "customer/customerFeedBack",
			resData: resData,
			success: true,
		});
	} else {
		res.render("customer/customerFeedBack", {
			layout: "customer/customerFeedBack",
			resData: resData,
			success: true,
		});
	}
};
// feedback end

// Display Feedback
exports.customerFeedBack = async (req, res) => {
	// const userId = req.cookies.userId;
	// console.log(userId);
	const options = {
		method: "GET",
		headers: {
			// Authorization: req.cookies.authToken,
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
	};
	const response = await fetch(`${URI}/feedback`, options);
	const resData = await response.json();
	console.log(resData);
	const { Commentatorid, Message, Date } = resData.data;
	res.render("customer/customerFeedBack", {
		layout: "customer/customerFeedBack",
		resData: resData,
	});
};
// display feedback end

// //Update Product
exports.AdminAddProduct = async (req, res) => {
	try {
		const image = req.body;
		console.log(image);
		const options = {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
				responseType: "json",
			},
			body: JSON.stringify({
				Productname: req.body.Productname,
				image_product: req.file.path,
				Price: req.body.Price,
			}),
		};

		const response = await fetch(`${URI}/addproduct`, options);

		const resData = await response.json();

		console.log("result:", resData);
		if (response.status === 200) {
			res.render("admin/AdminProducts", {
				layout: "admin/AdminProducts",
				resData: resData,
				sucess: true,
			});
		} else {
			res.render("admin/AdminProducts", {
				layout: "admin/AdminProducts",
				resData: resData,
				sucess: false,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

// displayCart;
exports.customerCart = async (req, res) => {
	const userId = req.cookies.userId;
	const token = req.cookies.authToken;
	// console.log(token);
	// console.log(userId);
	const options = {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
	};

	const optionsTwo = {
		method: "GET",
		headers: {
			authToken: token,
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
	};

	const response = await fetch(`${URI}/cart/${userId}`, options);
	const responseTwo = await fetch(`${URI}/duration`, optionsTwo);
	const resData = await response.json();
	const resDataTwo = await responseTwo.json();
	console.log(resDataTwo);
	// const { data } = resDataTwo.data;

	// {{{resDataTwo.data.}}}
	res.render("customer/customerCart", {
		layout: "customer/customerCart",
		resData: resData,
		data: resDataTwo.data,
	});
};

//display notification
exports.notificationGet = async (req, res) => {
	const userId = req.cookies.userId;
	console.log(userId);
	const options = {
		method: "GET",
		headers: {
			Authorization: req.cookies.authToken,
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
	};
	const response = await fetch(`${URI}/user/notification/${userId}`, options);
	const resData = await response.json();
	console.log(resData);
	const { message } = resData.data;
	res.render("customer/customerNotification", {
		layout: "customer/customerNotification",
		resData: resData,
	});
};
//end notification

//display booking client
exports.customerTransactions = async (req, res) => {
	const userId = req.cookies.userId;
	const token = req.cookies.authToken;
	const options = {
		method: "GET",
		headers: {
			authToken: token,
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
	};

	const response = await fetch(`${URI}/clientbooking/${userId}`, options);
	const resData = await response.json();
	const data = resData.data;

	let newDatas = [];
	for (let i = 0; i < data.length; i++) {
		const cart = data[i].cart;
		const services = [];
		for (let x = 0; x < cart.length; x++) {
			services.push(cart[x].serviceName);
		}
		newDatas.push({
			...data[i],
			services: services,
		});
	}

	res.render("customer/customerTransactions", {
		layout: "customer/customerTransactions",
		resData: newDatas,
	});
};
