'use strict';

// React component for the front side of the card

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardFront = function (_React$Component) {
	_inherits(CardFront, _React$Component);

	function CardFront() {
		_classCallCheck(this, CardFront);

		return _possibleConstructorReturn(this, (CardFront.__proto__ || Object.getPrototypeOf(CardFront)).apply(this, arguments));
	}

	_createClass(CardFront, [{
		key: 'render',
		value: function render(props) {
			return React.createElement(
				'div',
				{ className: 'card-side side-front' },
				React.createElement(
					'div',
					{ className: 'card-side-container' },
					React.createElement(
						'h2',
						{ id: 'trans' },
						this.props.text
					)
				)
			);
		}
	}]);

	return CardFront;
}(React.Component);

// React component for the back side of the card


var CardBack = function (_React$Component2) {
	_inherits(CardBack, _React$Component2);

	function CardBack() {
		_classCallCheck(this, CardBack);

		return _possibleConstructorReturn(this, (CardBack.__proto__ || Object.getPrototypeOf(CardBack)).apply(this, arguments));
	}

	_createClass(CardBack, [{
		key: 'render',
		value: function render(props) {
			return React.createElement(
				'div',
				{ className: 'card-side side-back' },
				React.createElement(
					'div',
					{ className: 'card-side-container' },
					React.createElement(
						'h2',
						{ id: 'congrats' },
						this.props.text
					)
				)
			);
		}
	}]);

	return CardBack;
}(React.Component);

function FirstInputCard() {
	// return (<div className="textCard english">
	// 	 {/* <input placeholder="English" id="word" onKeyPress={checkReturn}></input> */}
	//  </div>);
	return React.createElement(
		'div',
		{ className: 'card-container textCard english', onClick: flip },
		React.createElement(
			'div',
			{ className: 'card-body' },
			React.createElement(CardBack, { className: 'cardBack', text: 'Correct!' }),
			React.createElement(CardFront, { className: 'cardFront', text: 'Volare' })
		)
	);
}

displayFlashcard();
displayUsername();

function FirstCard() {
	return React.createElement(
		'div',
		{ className: 'textCard' },
		React.createElement('input', { placeholder: 'Answer here!', id: 'word', onKeyPress: checkReturn })
	);
}
/*
function FirstCard() {
	 return (<div className="textCard chinese">
	 <p id="output" className="grayColor">Chinese</p>
	 </div>);
	 }
*/

function LangoTitleDisplay() {
	return React.createElement(
		'div',
		{
			className: 'LangoTitle' },
		React.createElement(
			'p',
			null,
			'Lango!'
		)
	);
}

function StartReviewDiv() {
	return React.createElement(
		'div',
		{
			className: 'StartReviewDiv' },
		React.createElement(
			'button',
			{ id: 'StartReviewButton', onClick: addCardFunc },
			'Add'
		)
	);
}

function SaveFlashcard() {
	return React.createElement(
		'div',
		{ className: 'SaveButtonDiv' },
		React.createElement(
			'button',
			{ onClick: displayFlashcard, className: 'SaveButton' },
			'Next'
		)
	);
}

function FooterDisplay() {
	return React.createElement(
		'div',
		{ className: 'userDisplay' },
		React.createElement(
			'p',
			{ className: 'username' },
			'UserName'
		)
	);
}

var textCards = React.createElement(
	'div',
	{
		className: 'textCards' },
	React.createElement(FirstInputCard, null),
	React.createElement(FirstCard, null)
);

var header = React.createElement(
	'header',
	null,
	React.createElement(StartReviewDiv, null),
	React.createElement(LangoTitleDisplay, null)
);

var main = React.createElement(
	'main',
	null,
	textCards,
	React.createElement(SaveFlashcard, null)
);

var footer = React.createElement(
	'footer',
	null,
	React.createElement(FooterDisplay, null)
);

var body = React.createElement(
	'div',
	{ className: 'body' },
	header,
	main,
	footer
);

var englishCompare = void 0; //Global var for comparing

ReactDOM.render(body, document.getElementById('root'));

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
	var url = 'translate?english=' + word;
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

function displayUsername() {
	var url = 'display';
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

function displayFlashcard() {
	var url = 'review';
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);

	if (!xhr) {
		alert('Not supported');
		return;
	}

	xhr.onload = function () {
		var responseStr = xhr.responseText;
		var object = JSON.parse(responseStr);
		var outputElem = document.getElementById('trans');
		var card = document.getElementsByClassName('card-container');
		outputElem.textContent = object.chinese;
		englishCompare = object.english;
		outputElem.classList.remove("grayColor");
		outputElem.classList.add("blackColor");
		if (card[0].classList.contains('hover')) {
			card[0].classList.remove('hover');
		}
	};

	xhr.onerror = function () {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
}

function addCardFunc() {
	location.href = 'http://server162.site:53119/user/lango.html';
}

function flip() {
	console.log("Inside flip function");
	var card = document.getElementsByClassName('card-container');
	var input = document.getElementById('word');
	var back = document.getElementById('congrats');

	if (card[0].classList.contains('hover')) {
		card[0].classList.remove('hover');
	} else {
		card[0].classList.add('hover');
	}

	if (englishCompare != input.value) {
		back.textContent = englishCompare;
	} else {
		back.textContent = 'Correct!';
		var url = 'correct';
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);

		if (!xhr) {
			alert('Not supported');
			return;
		}
		xhr.onerror = function () {
			alert('Woops, there was an error making the request.');
		};

		xhr.send();
	}
}