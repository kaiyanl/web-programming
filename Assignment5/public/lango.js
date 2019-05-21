'use strict';

// An element to go into the DOM

var lango = React.createElement(
	"h1",
	{ id: "logo" },
	"Lango!"
);

// A component - function that returns some elements 
function FirstCard() {
	return React.createElement(
		"div",
		{ className: "textCard" },
		React.createElement("p", { id: "outputGoesHere" })
	);
}

// Another component
function FirstInputCard() {
	return React.createElement(
		"div",
		{ className: "textCard" },
		React.createElement("textarea", { id: "word" }),
		React.createElement(
			"p",
			{ onClick: sendRequest },
			"submit"
		)
	);
}

// An element with some contents, including a variable
// that has to be evaluated to get an element, and some
// functions that have to be run to get elements. 
var main = React.createElement(
	"main",
	null,
	lango,
	React.createElement(FirstInputCard, null),
	React.createElement(
		"button",
		{ onClick: saveFlashcard },
		"Save"
	),
	React.createElement(FirstCard, null)
);

ReactDOM.render(main, document.getElementById('root'));

// onKeyPress function for the textarea element
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
	console.log(event.charCode);
}

var word1 = void 0,
    output = void 0;

function sendRequest() {
	word1 = document.getElementById("word").value;
	makeCorsRequest(word1);
}

function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true); // call its open method
	return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(word1) {
	var url = "translate?english=" + word1;
	var xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
		alert('Not supported');
		return;
	}

	// Load some functions into response handlers.
	xhr.onload = function () {
		var responseStr = xhr.responseText; // get the JSON string 
		var object = JSON.parse(responseStr); // turn it into an object
		// console.log(JSON.stringify(object, undefined, 2));  print it out as a string, nicely formatted
		output = document.getElementById("outputGoesHere");
		output.textContent = object.Chinese;
	};

	xhr.onerror = function () {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}

function saveFlashcard() {
	var url = "store?english=" + word1 + "&chinese=" + output.textContent;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.send();
}