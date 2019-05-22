'use strict';

// An element to go into the DOM
const lango = <h1 id="logo">Lango!</h1>;


// A component - function that returns some elements 
function FirstCard() {
	 return (<div className="textCard">
	 <p id="outputGoesHere"></p>
	 </div>);
	 }

// Another component
function FirstInputCard() {
         return (<div className="textCard">
	          <textarea id="word" onKeyPress={checkReturn}></textarea>
		  </div>);
            }

function LangoTitleDisplay() {
    return (<div
            className="LangoTitle">
            <p>Lango!</p>        
            </div>
            )
}

function StartReviewButton() {
    return (<div
            className="ReviewButton">
            <button onClick={StartReviewFunc}>Start Review</button>
            </div>
    )
}

function FooterDisplay() {
    return (<div className="userDisplay">
            <p>UserName</p>
            </div>)
}

function SaveFlashcard() {
    return (<div className="SaveButtonDiv">
            <button onClick={saveFlashcard} className="SaveButton">Save</button>
            </div>)
}
	    
// An element with some contents, including a variable
// that has to be evaluated to get an element, and some
// functions that have to be run to get elements. 
const textCards = (<div
                className="textCards">
                <FirstInputCard/>
                <FirstCard/>
                </div>)

const main = (<main>
	      	{textCards}
            <SaveFlashcard/>    
	      </main>
	     );

const header = (<header>
            <StartReviewButton/>
            <LangoTitleDisplay/>
	      </header>
	     );

const footer = (<footer>
            <FooterDisplay/>
            </footer>)

const body = (<div>
        {header}
        {main}
        {footer}
    </div>)




ReactDOM.render(
    body,
    document.getElementById('root')
);

// onKeyPress function for the textarea element
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
    console.log(event.charCode);
    if(event.charCode == 13){
        sendRequest();
    }
}

let word1, output;

function sendRequest(){
	word1 = document.getElementById("word").value;
	makeCorsRequest(word1);
}
	 
function createCORSRequest(method, url) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);  // call its open method
	return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(word1) {
	let url = `translate?english=${word1}`
	let xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
		alert('Not supported');
		return;
	}

	// Load some functions into response handlers.
	xhr.onload = function() {
		let responseStr = xhr.responseText;  // get the JSON string 
		let object = JSON.parse(responseStr);  // turn it into an object
		// console.log(JSON.stringify(object, undefined, 2));  print it out as a string, nicely formatted
		output = document.getElementById("outputGoesHere");
		output.textContent = object.Chinese;
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}

function saveFlashcard() {
	let url = `store?english=${word1}&chinese=${output.textContent}`
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.send();
}

function StartReviewFunc() {
    console.log("Review coming soon!");
}
	 