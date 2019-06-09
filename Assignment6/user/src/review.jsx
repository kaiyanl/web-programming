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
	return(
		<div className='card-container textCard english' onClick={flip}>
		  <img src={'./assets/rotate.png'}></img>
		  <div className='card-body'>
			<CardBack className='cardBack' text="Correct!" />  
			<CardFront className='cardFront' text="Volare" />
		  </div>
		</div>
	  );
}

displayFlashcard();
displayUsername();


function FirstCard() {
	return (<div className="textCard">
		 <input placeholder="Answer here!" id="word" onKeyPress={checkReturn}></input>
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
            <button onClick={displayFlashcard} className="SaveButton">Next</button>
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

let englishCompare; //Global var for comparing

ReactDOM.render(
    body,
    document.getElementById('root')
);

function checkReturn(event) {
    console.log(event.charCode);
    if(event.charCode == 13){
		flip();
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
    
function displayUsername() {
	let url = `display`;
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
		let username = object[0].firstName + ' ' + object[0].lastName;
		outputElem[0].textContent = username;
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};
    
	xhr.send();
}

function displayFlashcard() {
	let url = `review`;
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);

    if (!xhr) {
		alert('Not supported');
		return;
	}

	xhr.onload = function() {
		let responseStr = xhr.responseText;
		let object = JSON.parse(responseStr);
		let outputElem = document.getElementById('trans');
        let card = document.getElementsByClassName('card-container');
		outputElem.textContent = object.chinese;
        englishCompare = object.english;
		outputElem.classList.remove("grayColor");
		outputElem.classList.add("blackColor");
        if (card[0].classList.contains('hover')) {
          card[0].classList.remove('hover');
        }
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
}

function addCardFunc() {
    location.href='http://server162.site:53119/user/lango.html';
}

function flip(){
    let card = document.getElementsByClassName('card-container');
    let input = document.getElementById('word');
    let back = document.getElementById('congrats');

    if (card[0].classList.contains('hover')) {
      card[0].classList.remove('hover');
    } else {
      card[0].classList.add('hover');
    }
    
    if(englishCompare != input.value){
		back.textContent = englishCompare;
		back.classList.remove("addBorder");
		back.classList.remove("addBackgroundColor");
		back.classList.remove("addTextColor");
    } else {
		back.classList.add("addBorder");
		back.classList.add("addBackgroundColor");
		back.classList.add("addTextColor");
		back.textContent = 'CORRECT!';
        let url = 'correct';
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        if (!xhr) {
            alert('Not supported');
            return;
        }
        xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
		};

        xhr.send();
    } 
}
