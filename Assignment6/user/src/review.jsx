'use strict';

  // React component for the front side of the card
  class CardFront extends React.Component {
	render(props) {
	  return(
		<div className='card-side side-front'>
		   <div className='card-side-container'>
				<h2 id='trans'>{this.props.text}</h2>
		  </div>
		</div>
	  )
	}
  }
  
  // React component for the back side of the card
  class CardBack extends React.Component {
	render(props) {
	  return(
		<div className='card-side side-back'>
		   <div className='card-side-container'>
				<h2 id='congrats'>{this.props.text}</h2>
		  </div>
		</div>
	  )
	}
  }

function FirstInputCard() {
	// return (<div className="textCard english">
	// 	 {/* <input placeholder="English" id="word" onKeyPress={checkReturn}></input> */}
	//  </div>);
	return(
		<div className='card-container textCard english' onClick={flip}>
		  <div className='card-body'>
			<CardBack text="Correct!" />
			  
			<CardFront text="Volare" />
		  </div>
		</div>
	  );
}

function FirstCard() {
	 return (<div className="textCard chinese">
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
            <button id="StartReviewButton" onClick={addCardFunc}>Add</button>
            </div>
    )
}

function SaveFlashcard() {
    return (<div className="SaveButtonDiv">
            <button onClick={saveFlashcard} className="SaveButton">Next</button>
            </div>)
}

function FooterDisplay() {
    return (<div className="userDisplay">
            <p>UserName</p>
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

function addCardFunc() {
    location.href='http://server162.site:53119/user/lango.html';
}

function flip(){
    console.log("Inside flip function");
    let card = document.getElementsByClassName('card-container');
    if (card[0].classList.contains('hover')) {
      card[0].classList.remove('hover');
    } else {
      card[0].classList.add('hover');
    }
}
