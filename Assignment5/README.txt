npm install express
npm install request
npm install sqlite3

Server detects queries of the form and should return the translation as JSON:
http://server162.site:53119/translate?english=apple

Run translation.html
http://server162.site:53119/translation.html

If encounter "events.js:160 throw er; // Unhandled 'error' event"
run "killall -9 node" to stop the running dashboard

To do:
Save not work. need to figure out how to connect to db in translation.js
