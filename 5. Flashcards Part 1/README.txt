First, get an API key following the instruction in ./"Getting an API key for a Google Cloud API.pdf" and fill it in line 8 in flashcardServer.js

Then run the following commands in order:

Add JSX to a Project if you haven't done it:
1. npm init -y
2. npm install babel-cli@6 babel-preset-react-app@3
more info: https://reactjs.org/docs/add-react-to-a-website.html#add-react-in-one-minute

Run JSX Preprocessor in public folder to compile jsx files in src folder: 
1. npx babel --watch src --out-dir . --presets react-app/prod
more info: https://reactjs.org/docs/add-react-to-a-website.html#add-react-in-one-minute

npm install

node flashcardServer.js

To access the webpage and see kinds of responses:
Server detects queries of the form and should return the translation as JSON:
http://server162.site:53119/translate?english=apple

Store cards into the database:
http://server162.site:53119/store?english=apple&chinese=苹果

Run lango.html：
http://server162.site:53119/lango.html

If encounter "events.js:160 throw er; // Unhandled 'error' event" :
run "killall -9 node" to stop the running dashboard
