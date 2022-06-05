function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

//Delete Service
function Deletedetails(event) {
	// event.preventDefault();
	console.log(getCookie("authToken"));
	const Service_id = event.target.id.value;
	(async () => {
		try {
			const baseURL = await fetch(
				`https://api.northeastcarcare.me/api/service/delete/${Service_id}`,
				{ method: "DELETE", headers: { Authorization: getCookie("authToken") } }
			);
			const result = await baseURL.json();
			console.log(result.data);
		} catch (error) {
			console.log(error);
		}
	})();
}

//Delete Product
function DeleteProduct(event) {
	// event.preventDefault();
	console.log(getCookie("authToken"));
	const Product_id = event.target.id.value;
	(async () => {
		try {
			const baseURL = await fetch(
				`https://api.northeastcarcare.me/api/product/delete/${Product_id}`,
				{ method: "DELETE", headers: { Authorization: getCookie("authToken") } }
			);
			const result = await baseURL.json();
			console.log(result.data);
		} catch (error) {
			console.log(error);
		}
	})();
}

const updateConfirm = async (event) => {
	// console.log('nanayko');
	event.preventDefault();

	const text = document.getElementById("Productname").value;

	const productId = document.getElementById("ProductID").value;

	const price = document.getElementById("Price").value;

	const image = document.getElementById("ImageFile").value;
	console.log(image);
	try {
		const baseURL = await fetch(
			`https://api.northeastcarcare.me/api/product/update/${productId}`,
			{
				method: "PUT",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
					responseType: "json",
				},
				body: JSON.stringify({
					Productname: text,
					Image: image,
					Price: price,
				}),
			}
		);
		const result = await baseURL.json();
		console.log(result.data);
	} catch (error) {
		console.log(error);
	}
};

//Accept Request
const Acceptrequest = async (event) => {
	//   event.preventDefault();
	console.log(getCookie("authToken"));
	const requestID = event.target.id.value;
	try {
		const baseURL = await fetch(
			`https://api.northeastcarcare.me/api/approve/${requestID}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: getCookie("authToken"),
				},
				body: JSON.stringify({
					requestID: requestID,
					RequestType: "Accept",
				}),
			}
		);
		const result = await baseURL.json();
		console.log(result.data);
	} catch (error) {
		console.log(error);
	}
};

//Decline Request
const Declinerequest = async (event) => {
	//   event.preventDefault();
	console.log(getCookie("authToken"));
	const requestID = event.target.id.value;
	try {
		const baseURL = await fetch(
			`https://api.northeastcarcare.me/api/decline/${requestID}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: getCookie("authToken"),
				},
				body: JSON.stringify({
					requestID: requestID,
					RequestType: "Decline",
				}),
			}
		);
		const result = await baseURL.json();
		console.log(result.data);
	} catch (error) {
		console.log(error);
	}
};

//Donerequest
const Donerequest = async (event) => {
	//   event.preventDefault();
	console.log(getCookie("authToken"));
	const requestID = event.target.id.value;
	try {
		const baseURL = await fetch(
			`https://api.northeastcarcare.me/api/done/${requestID}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: getCookie("authToken"),
				},
				body: JSON.stringify({
					requestID: requestID,
					RequestType: "Done",
				}),
			}
		);
		const result = await baseURL.json();
		console.log(result.data);
	} catch (error) {
		console.log(error);
	}
};

//Cancelledrequest
const Cancelledrequest = async (event) => {
	//   event.preventDefault();
	console.log(getCookie("authToken"));
	const requestID = event.target.id.value;
	try {
		const baseURL = await fetch(
			`https://api.northeastcarcare.me/api/cancelled/${requestID}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: getCookie("authToken"),
				},
				body: JSON.stringify({
					requestID: requestID,
					RequestType: "Cancelled",
				}),
			}
		);
		const result = await baseURL.json();
		console.log(result.data);
	} catch (error) {
		console.log(error);
	}
};

// Get Service Details
function GetService(event) {
	event.preventDefault();
	// console.log(getCookie('authToken'));
	const Service_id = event.target.idOne.value;
	// console.log(event.target);
	(async () => {
		try {
			const baseURL = await fetch(
				`https://api.northeastcarcare.me/api/services/${Service_id}`,
				{ method: "GET", headers: { Authorization: getCookie("authToken") } }
			);
			const result = await baseURL.json();

			// console.log(result.data);
		} catch (error) {
			console.log(error);
		}
	})();
}

const updateServiceConfirm = async (event) => {
	// console.log();
	event.preventDefault();

	const text = document.getElementById("Servicename").value;

	const serviceId = document.getElementById("ServiceID").value;

	const time = document.getElementById("Time").value;

	const image = document.getElementById("ImageFile").value;
	console.log(image);
	try {
		const baseURL = await fetch(
			`https://api.northeastcarcare.me/api/service/update/${serviceId}`,
			{
				method: "PUT",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
					responseType: "json",
				},
				body: JSON.stringify({
					Servicename: text,
					Image: image,
					Time: time,
				}),
			}
		);
		const result = await baseURL.json();
		console.log(result.data);
	} catch (error) {
		console.log(error);
	}
};

// addToCArt

const AddCartBtn = async (event) => {
	event.preventDefault();
	const Service_id = event.target.ServiceID.value;
	console.log(Service_id);
	const baseURL = await fetch(
		`https://api.northeastcarcare.me/api/cart/${Service_id}`,
		{
			method: "POST",
			headers: {
				authToken: getCookie("authToken"),
				"Content-type": "application/json",
				Accept: "application/json",
				responseType: "json",
			},
		}
	);
	const result = await baseURL.json();
	console.log(result.data);
	alert(result.message);
};

// removeCArt

const removeCart = async (event) => {
	// event.preventDefault();
	const id = await event.target.id.value;
	console.log(id);
	const baseURL = await fetch(
		`https://api.northeastcarcare.me/api/itemdelete/${id}`,
		{
			method: "DELETE",
		}
	);
	const result = await baseURL.json();
	alert(result.message);
};
