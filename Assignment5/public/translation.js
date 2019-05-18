let word1, output;
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);  

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
  const insertStr = 'INSERT INTO Flashcards VALUES(1,' +word1+ ',' +output.textContent+ ',0,0)'
  db.run(insertStr,insertCallback);
}

function insertCallback(err) {
    if (err) {
  console.log("Insertion error",err);
    } else {
  console.log("Inserted");
    db.all ( 'SELECT * FROM Flashcards', dataCallback);
  }
}

function dataCallback( err, data ) {console.log(data)}
