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
