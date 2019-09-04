const express = require('express');
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs"); // file system
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');

const port = 53119;
const APIrequest = require('request');
const http = require('http');
const keys = require('./config/keys');
const APIkey = keys.API;
const APIurl = "https://translation.googleapis.com/language/translate/v2?key="+APIkey;

const googleLoginData = {
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/redirect'
};

function translateQueryHandler(req, res, next) {
    let qObj = req.query;
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
                if (err) {
                    console.log('error: ' + err);
                } else {
                    console.log('APIresHead.statusCode: ' + APIresHead.statusCode);
                }     
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

function reviewQueryHandler(req, res, next) {
    const selectStr = `SELECT * FROM Flashcards WHERE user = ${req.user.userID}` 
    db.all(selectStr, function(err,data) {
        if(err) {
            throw err;
        }

        let randomCard = Math.floor(Math.random() * (data.length));

        let score;
        if(data[randomCard].seen == 0) {
            score = 15;
        } else {
            score = ( Math.max(1,5-data[randomCard].correct) + Math.max(1,5-data[randomCard].seen) + 5*((data[randomCard].seen-data[randomCard].correct)/(data[randomCard].seen + 0.0001)) );
        }
        
        let randomValue = Math.floor(Math.random() * 16);
        
        while(randomValue > score) {
            randomCard = Math.floor(Math.random() * (data.length));
            if(data[randomCard].seen == 0) {
                score = 15;
            } else {
                score = ( Math.max(1,5-data[randomCard].correct) + Math.max(1,5-data[randomCard].seen) + 5*((data[randomCard].seen-data[randomCard].correct)/(data[randomCard].seen + 0.0001)) );
            }
            randomValue = Math.floor(Math.random() * 16);
        }
        let seen = data[randomCard].seen + 1;
        englishGlob = data[randomCard].english;
        
        const updateSeenStr = `UPDATE Flashcards SET seen=${seen} WHERE user = ${req.user.userID} AND english = '${englishGlob}'`;  
        db.run(updateSeenStr, function(err) {
            if(err){
                throw err;
            } 
        });
        
        console.log("\nDatabase:");
        console.log(data);
        console.log("\nCurrent flashcard:");
        console.log(data[randomCard]);
        res.json(data[randomCard]);
    });
};

let englishGlob;

function displayQueryHandler(req, res, next) {
    const selectStr = `select * from Users where gid=${req.user.userID}`
    db.all(selectStr,function(err,data){
        if(err){
            throw err;
        }
        res.json(data);
    });
};

function correctQueryHandler(req, res, next) {
    const selectStr = `SELECT * FROM Flashcards WHERE user = ${req.user.userID} AND english = '${englishGlob}'`;
    db.all(selectStr, function(err,data) {
        if(err) {
            throw err;
        }
        else {
            let correct = data[0].correct + 1;
            const updateSeenStr = `UPDATE Flashcards SET correct=${correct} WHERE user = ${req.user.userID} AND english = '${englishGlob}'`;
            db.run(updateSeenStr, function(err) {
            if(err){
                throw err;
            } 
            });
        }
    });
}

function storeQueryHandler(req, res, next) {
    let qObj = req.query;
    if (qObj.english != undefined && qObj.chinese != 'undefined') {
        const insertStr = 'INSERT INTO Flashcards (user,english,chinese,seen,correct) VALUES(@0,@1,@2,0,0)'
        db.run(insertStr,req.user.userID,qObj.english,qObj.chinese,function(err){
            if (err) {
                console.log("Insertion error",err);
            } else {
                console.log("Inserted");
                db.all ( `SELECT * FROM Flashcards WHERE user=${req.user.userID}`, function(err,data) {
                    console.log(`\nDatabase:`);
                    console.log(data);
                });
            }
        });
    } else {

	    next();
    }
};

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
};

function cardTableCreationCallback(err) {
    if (err) {
	console.log("Flashcards Table creation error",err);
    } 
    // else {
	// console.log("Flashcards Table created");
    // }
};

function usersTableCreationCallback(err) {
    if (err) {
	console.log("Users Table creation error",err);
    } 
};

// create database
const dbFileName = "Flashcards.db";
const db = new sqlite3.Database(dbFileName);  
const createCardTableStr = 'CREATE TABLE IF NOT EXISTS Flashcards (user int, english string, chinese string, seen int, correct int)';
const createUserTableStr = 'CREATE TABLE IF NOT EXISTS Users (gid int, firstName string, lastName string)';
db.run(createCardTableStr,cardTableCreationCallback);
db.run(createUserTableStr,usersTableCreationCallback);
process.on('exit', function(){db.close();}); // Close database on exiting the terminal

// put together the server pipeline
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );
const app = express();
app.use('/', printURL);
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: [keys.session.cookieKey]  
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
app.get('/user/translate', translateQueryHandler );
app.get('/user/store', storeQueryHandler );
app.get('/user/review', reviewQueryHandler);
app.get('/user/display',displayQueryHandler);
app.get('/user/correct', correctQueryHandler);
app.use( fileNotFound );
app.listen(port, function (){console.log('Listening...');} );

// ---------------------------------middleware functions------------------------------------

// print the url of incoming HTTP request
function printURL (req, res, next) {
    console.log('\n'+req.url);
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

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google. 
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);
    const getIdStr = 'SELECT gid FROM Users'
    db.all(getIdStr,function(err,data){
        if (err) {
            console.log("Select error",err);
        } else {
            console.log("Got Column gid from Table Users!");
            let flag = 0;
            for(let i = 0; i < data.length; i++){
                if(profile.id == data[i].gid){
                        console.log("Profile is gid!");
                        flag = 1;
                }
            }
            if(flag == 0){
                const insertUser = 'INSERT INTO Users (gid,firstName,lastName) VALUES(@0,@1,@2)'
                db.run(insertUser, profile.id, profile.name.givenName, profile.name.familyName, function(err){  
                            if (err) {
                                console.log("User insertion error",err);
                            } else {
                                console.log("User insertion complete!");
                                console.log("All data from Users!:");
                                db.all('select * from Users',function(err,data){
                                    console.log(data);
                                });
                            }   
                        })
            }
        }
    });
    
    let dbRowID = profile.id;
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
    let userData = {userID: dbRowID};
    done(null, userData);
});
