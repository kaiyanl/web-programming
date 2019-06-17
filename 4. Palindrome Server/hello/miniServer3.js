const express = require('express')
const port = 53119

function queryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if (qObj.word != undefined) {
	res.json( {"palindrome" : palindrome(qObj.word)} );
    }
    else {
	next();
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

function palindrome(word) {
    //word abc -> return abccba
    let palin=word;
    for(let i=0; i<word.length; i++){
        palin = palin+word[word.length-1-i];
    }
    return palin;
}

// put together the server pipeline
const app = express()
app.use(express.static('public'));  // can I find a static file? 
app.get('/query', queryHandler );   // if not, is it a valid query?
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )
 
