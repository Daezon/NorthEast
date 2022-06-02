// // Get the modal
// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var btn = document.getElementById('myBtn');

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName('close')[0];

// // When the user clicks the button, open the modal
// btn.onclick = function () {
//   modal.style.display = 'block';
// };

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = 'none';
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = 'block';
//   }
// };

const GetModal = async (event) => {
	let arg1 = event.target.getAttribute("data-arg1");
	console.log(arg1);
	var modal = document.getElementById(`modal_${arg1}`);
	// Get the button that opens the modal
	var btn = document.getElementById(`myButton_${arg1}`);

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal
	btn.onclick = function () {
		modal.style.display = "block";
	};

	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "block";
		}
	};
};
