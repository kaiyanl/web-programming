'use strict';

function FirstInputCard() {
	return (<div className="textCard">
		 <input placeholder="English" id="word" onKeyPress={checkReturn}></input>
	 </div>);
}

function FirstCard() {
	 return (<div className="textCard">
	 <p id="output" className="grayColor">Chinese</p>
	 </div>);
	 }

function LangoTitleDisplay() {
    return (<div
            className="LangoTitle">
            <p>Lango!</p>        
            </div>
    )
}

function StartReviewDiv() {
    return (<div
            className="StartReviewDiv">
            <button id="StartReviewButton" onClick={StartReviewFunc}>Start Review</button>
            </div>
    )
}

function SaveFlashcard() {
    return (<div className="SaveButtonDiv">
            <button onClick={saveFlashcard} className="SaveButton">Save</button>
            </div>)
}

function FooterDisplay() {
    return (<div className="userDisplay">
            <p className="username">UserName</p>
            </div>)
}

const textCards = (<div
                className="textCards">
                <FirstInputCard/>
                <FirstCard/>
                </div>);

const header = (<header>
            <StartReviewDiv/>
            <LangoTitleDisplay/>
	      </header>
	     );

const main = (<main>
			{textCards}
		  <SaveFlashcard/>    
		</main>
	   );

const footer = (<footer>
            <FooterDisplay/>
            </footer>);

const body = (<div className="body">
        {header}
        {main}
        {footer}
    </div>);

ReactDOM.render(
    body,
    document.getElementById('root')
);

// onKeyPress function
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
    console.log(event.charCode);
    if(event.charCode == 13){
		let english = document.getElementById("word").value;
		sendRequest(english);
    }
}

function sendRequest(word){
	makeCorsRequest(word);
}
	 
function createCORSRequest(method, url) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	return xhr;
}

function makeCorsRequest(word) {
	let url = `translate?english=${word}`
	let xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
		alert('Not supported');
		return;
	}

	xhr.onload = function() {
		let responseStr = xhr.responseText;
		let object = JSON.parse(responseStr);
		let outputElem = document.getElementById("output");
		outputElem.textContent = object.Chinese;
		outputElem.classList.remove("grayColor");
		outputElem.classList.add("blackColor");
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
}

function saveFlashcard() {
	let english = document.getElementById("word").value;
	let chinese = document.getElementById("output").textContent;
	let url = `store?english=${english}&chinese=${chinese}`
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.send();
}

function StartReviewFunc() {
    location.href='http://server162.site:53119/user/review.html';
}

function displayUsername() {
	let url = `display`
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);

    if (!xhr) {
		alert('Not supported');
		return;
	}

	xhr.onload = function() {
		let responseStr = xhr.responseText;
		let object = JSON.parse(responseStr);
		let outputElem = document.getElementsByClassName("username");
		let username = object[0].firsrName + ' ' + object[0].lastName;
		outputElem[0].textContent = username;
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};
    
	xhr.send();
}

displayUsername();
