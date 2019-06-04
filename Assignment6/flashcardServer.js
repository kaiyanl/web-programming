const express = require('express');
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs"); // file system
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');

const port = 53119;
const APIrequest = require('request');
const http = require('http');
const APIkey = 'AIzaSyAnBSkl-zu9eupqVziEz7qjFmSmPCauHvg';
const APIurl = "https://translation.googleapis.com/language/translate/v2?key="+APIkey;

const googleLoginData = {
    clientID: '412333577237-hrvls4g0cr2hdmlqn432bohhirk0pvn7.apps.googleusercontent.com',
    clientSecret: 'nDxIP2Y8cbZuCoCnIeus3vq2',
    callbackURL: '/auth/redirect'
};

function translateQueryHandler(req, res, next) {
    let qObj = req.query;
    console.log(`\ntranslateQuery: `);
    console.log(qObj);
    if (qObj.english != undefined) {
        let requestObject = 
        {
            "source": "en",
            "target": "zh-CN",
            "q": [
                qObj.english
            ]
        }

        APIrequest(
        {   // HTTP header stuff
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
                res.json( {"English" : qObj.english, "Chinese": APIresBody.data.translations[0].translatedText} );
                }
            }
        } // end callback function
    }
    else {
	next();
    }
};

function storeQueryHandler(req, res, next) {
    let qObj = req.query;
    console.log(`\nstoreQuery: `);
    console.log(qObj);
    if (qObj.english != undefined && qObj.chinese != undefined) {
        const insertStr = 'INSERT INTO Flashcards (user,english,chinese,seen,correct) VALUES(1,@0,@1,0,0)'
        db.run(insertStr,qObj.english,qObj.chinese,function(err){
            if (err) {
                console.log("Insertion error",err);
            } else {
                console.log("Inserted");
                db.all ( 'SELECT * FROM Flashcards', function(err,data) {
                    console.log(`\nFlashcards Database:`);
                    console.log(data);
                    res.json(data);
                });
            }
        });
    }
    else {
	    next();
    }
};

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
};

function tableDropCallback(err) {
    if (err) {
    console.log("Table drop error",err);
    } else {
    console.log("Table dropped if exists");
    db.run(createCardTableStr,tableCreationCallback);
    }
};

function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Table created");
    }
};

// create database
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);  
const dropStr = 'DROP TABLE IF EXISTS Flashcards'
const createCardTableStr = 'CREATE TABLE Flashcards (user int, english string, chinese string, seen int, correct int)'
const createUserTableStr = 'CREATE TABLE Users (gid int, firstName string, lastName string)'
db.run(dropStr,tableDropCallback);
process.on('exit', function(){db.close();}); // Close database on exiting the terminal

// put together the server pipeline
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );
const app = express();
app.use('/', printURL);
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));
// Initializes request object for further handling by passport
app.use(passport.initialize()); 
// If there is a valid cookie, will call deserializeUser()
app.use(passport.session()); 
// Public static files
app.get('/*',express.static('public'));
app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );
app.get('/auth/redirect',
	// for educational purposes
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	// This will issue Server's own HTTPS request to Google
	// to access the user's profile information with the 
	// temporary key we got in the request. 
	passport.authenticate('google'),
	// then it will run the "gotProfile" callback function,
	// set up the cookie, call serialize, whose "done" 
	// will come back here to send back the response
	// ...with a cookie in it for the Browser! 
	function (req, res) {
	    console.log('Logged in and using cookies!')
	    res.redirect('/user/lango.html');
	});

// static files in /user are only available after login
app.get('/user/*',
	isAuthenticated, // only pass on to following function if
	// user is logged in 
	// serving files that start with /user from here gets them from ./
	express.static('.') 
       ); 

// app.use(express.static('public'));
app.get('/translate', translateQueryHandler );
app.get('/store', storeQueryHandler );
app.use( fileNotFound );
app.listen(port, function (){console.log('Listening...');} );

// middleware functions

// print the url of incoming HTTP request
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    if (req.user) {
	console.log("Req.session:",req.session);
	console.log("Req.user:",req.user);
	next();
    } else {
	res.redirect('/login.html');  // send response telling
	// Browser to go to login page
    }
}


// function for end of server pipeline
function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// Some functions Passport calls, that we can use to specialize.
// This is where we get to write our own code, not just boilerplate. 
// The callback "done" at the end of each one resumes Passport's
// internal process. 

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);
    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

    let dbRowID = 1;  // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  

    done(null, dbRowID); 
}

// Part of Server's sesssion set-up.  
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie. 
passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie. 
// Where we should lookup user database info. 
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object. 
    let userData = {userData: "data from db row goes here"};
    done(null, userData);
});
