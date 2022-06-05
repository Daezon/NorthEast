var slideIndex = 1;
var bookingDates = document.getElementById("bookingDates");
var timeListData = document.getElementsByClassName("timeListData");

showSlides(slideIndex);

const getDateTime = async () => {
	const dates = bookingDates.dataset.locations.split(",");
	console.log("dates", dates);
	const options = {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Accept: "application/json",
			responseType: "json",
		},
	};
	const response = await fetch(
		`https://api.northeastcarcare.me/api/time/${dates[slideIndex - 1]}`,
		options
	);
	const resData = await response.json();
	const timeArr = resData.data;
	console.log("resData", timeArr);
	timeListData[slideIndex - 1].innerHTML = "";
	for (let i = 0; i < timeArr.length; i++) {
		var timeList = document.createElement("div");
		var timeListTime = document.createElement("div");
		var timeListDuration = document.createElement("div");
		timeList.className = "timeList";
		timeListTime.className = "timeListTime";
		timeListDuration.className = "timeListDuration";

		timeList.appendChild(timeListTime);
		timeList.appendChild(timeListDuration);
		timeListData[slideIndex - 1].appendChild(timeList);

		timeListTime.innerHTML = timeArr[i].time;
		timeListDuration.innerHTML = timeArr[i].duration;
	}
};

function plusSlides(n) {
	showSlides((slideIndex += n));
	getDateTime();
}

function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	//   dots[slideIndex - 1].className += " active";
}

if (slideIndex == 1) {
	getDateTime();
}
