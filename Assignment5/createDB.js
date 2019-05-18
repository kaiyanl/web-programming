// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db
const createStr = 'CREATE TABLE Flashcards (user int, english string, chinese string, seen int, correct int)'
const dropStr = 'DROP TABLE IF EXISTS Flashcards'
db.run(dropStr,tableDropCallback);


const insertStr = 'INSERT INTO Flashcards VALUES(1,"english","英语",0,0)'

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
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
	db.run(insertStr,insertCallback);
    }
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

process.on('exit', function(){db.close();}); // Close database on exiting the terminal
