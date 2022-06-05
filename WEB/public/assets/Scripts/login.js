function myFunction() {
	const a = document.getElementById("passwordLogIn");
	const b = document.getElementById("hide1");
	const c = document.getElementById("hideme");

	if (a.type === "password") {
		a.type = "text";
		b.style.display = block;
		c.style.display = none;
	} else {
		a.type = "password";
		b.style.display = none;
		c.style.display = block;
	}
}

const userLogin = async () => {
	const Email = document.getElementById("emailLogIn");
	const Password = document.getElementById("passwordLogIn");

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
		body: JSON.stringify({
			Email: Email.value,
			Password: Password.value,
		}),
	};
	const response = await fetch(
		"https://api.northeastcarcare.me/api/user/login",
		options
	);
	const resData = await response.json();
	console.log(resData);
	if (response.status === 200) {
		alert(resData.message);
		window.location.replace("customerhome.html");
	} else alert(resData.message);
};
const loginform = document.getElementById("loginform");
loginform.addEventListener("submit", (event) => {
	event.preventDefault();
	userLogin();
});
