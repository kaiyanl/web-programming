const express = require('express')
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs"); // file system

const port = 53119
const APIrequest = require('request');
const http = require('http');
const APIkey = 'AIzaSyAnBSkl-zu9eupqVziEz7qjFmSmPCauHvg';  // ADD API KEY HERE
const APIurl = "https://translation.googleapis.com/language/translate/v2?key="+APIkey


function queryHandler(req, res, next) {
    // let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if (qObj.english != undefined) {
        let requestObject = 
        {
        "source": "en",
        "target": "zh-CN",
        "q": [
            // "example phrase"
            qObj.english
        ]
        }
        // requestObject.q[0] = qObj.english;
        APIrequest(
        { // HTTP header stuff
            url: APIurl,
            method: "POST",
            headers: {"content-type": "application/json"},
            // will turn the given object into JSON
            json: requestObject },
        // callback function for API request
        APIcallback
        );

        // callback function, called when data is received from API
        function APIcallback(err, APIresHead, APIresBody) {
        // gets three objects as input
        if ((err) || (APIresHead.statusCode != 200)) {
            // API is not working
            console.log("Got API error");
            console.log(body);
        } else {
            if (APIresHead.error) {
            // API worked but is not giving you data
            console.log(APIresHead.error);
            } else {
            // console.log("In Chinese: ", 
            //     APIresBody.data.translations[0].translatedText);
            // console.log("\n\nJSON was:");
            // console.log(JSON.stringify(APIresBody, undefined, 2));
            // print it out as a string, nicely formatted
            res.json( {"English" : qObj.english, "Chinese": APIresBody.data.translations[0].translatedText} );
            }
        }
        } // end callback function

	
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

function tableDropCallback(err) {
    if (err) {
    console.log("Table drop error",err);
    } else {
    console.log("Table dropped if exists");
    db.run(createStr,tableCreationCallback);
    }
}

function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Table created");
    }
}

// create database
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);  
const dropStr = 'DROP TABLE IF EXISTS Flashcards'
const createStr = 'CREATE TABLE Flashcards (user int, english string, chinese string, seen int, correct int)'
db.run(dropStr,tableDropCallback);
process.on('exit', function(){db.close();}); // Close database on exiting the terminal
// put together the server pipeline
const app = express();
app.use(express.static('public'));  // can I find a static file? 
app.get('/translate', queryHandler );   // if not, is it a valid query?
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )
 
