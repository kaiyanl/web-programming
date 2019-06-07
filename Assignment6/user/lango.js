'use strict';

function FirstInputCard() {
	return React.createElement(
		"div",
		{ className: "textCard" },
		React.createElement("input", { placeholder: "English", id: "word", onKeyPress: checkReturn })
	);
}

function FirstCard() {
	return React.createElement(
		"div",
		{ className: "textCard" },
		React.createElement(
			"p",
			{ id: "output", className: "grayColor" },
			"Chinese"
		)
	);
}

function LangoTitleDisplay() {
	return React.createElement(
		"div",
		{
			className: "LangoTitle" },
		React.createElement(
			"p",
			null,
			"Lango!"
		)
	);
}

function StartReviewDiv() {
	return React.createElement(
		"div",
		{
			className: "StartReviewDiv" },
		React.createElement(
			"button",
			{ id: "StartReviewButton", onClick: StartReviewFunc },
			"Start Review"
		)
	);
}

function SaveFlashcard() {
	return React.createElement(
		"div",
		{ className: "SaveButtonDiv" },
		React.createElement(
			"button",
			{ onClick: saveFlashcard, className: "SaveButton" },
			"Save"
		)
	);
}

function FooterDisplay() {
	return React.createElement(
		"div",
		{ className: "userDisplay" },
		React.createElement(
			"p",
			{ className: "username" },
			"UserName"
		)
	);
}

var textCards = React.createElement(
	"div",
	{
		className: "textCards" },
	React.createElement(FirstInputCard, null),
	React.createElement(FirstCard, null)
);

var header = React.createElement(
	"header",
	null,
	React.createElement(StartReviewDiv, null),
	React.createElement(LangoTitleDisplay, null)
);

var main = React.createElement(
	"main",
	null,
	textCards,
	React.createElement(SaveFlashcard, null)
);

var footer = React.createElement(
	"footer",
	null,
	React.createElement(FooterDisplay, null)
);

var body = React.createElement(
	"div",
	{ className: "body" },
	header,
	main,
	footer
);

ReactDOM.render(body, document.getElementById('root'));

// onKeyPress function
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
	console.log(event.charCode);
	if (event.charCode == 13) {
		var english = document.getElementById("word").value;
		sendRequest(english);
	}
}

function sendRequest(word) {
	makeCorsRequest(word);
}

function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	return xhr;
}

function makeCorsRequest(word) {
	var url = "translate?english=" + word;
	var xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
		alert('Not supported');
		return;
	}

	xhr.onload = function () {
		var responseStr = xhr.responseText;
		var object = JSON.parse(responseStr);
		var outputElem = document.getElementById("output");
		outputElem.textContent = object.Chinese;
		outputElem.classList.remove("grayColor");
		outputElem.classList.add("blackColor");
	};

	xhr.onerror = function () {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
}

function saveFlashcard() {
	var english = document.getElementById("word").value;
	var chinese = document.getElementById("output").textContent;
	var url = "store?english=" + english + "&chinese=" + chinese;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.send();
}

function StartReviewFunc() {
	location.href = 'http://server162.site:53119/user/review.html';
}

function displayUsername() {
	var url = "display";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);

	if (!xhr) {
		alert('Not supported');
		return;
	}

	xhr.onload = function () {
		var responseStr = xhr.responseText;
		var object = JSON.parse(responseStr);
		var outputElem = document.getElementsByClassName("username");
		var username = object[0].firstName + ' ' + object[0].lastName;
		outputElem[0].textContent = username;
	};

	xhr.onerror = function () {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
}

displayUsername();