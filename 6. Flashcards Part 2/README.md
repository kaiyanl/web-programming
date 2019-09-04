# Lango
http://lango-kl.herokuapp.com
## About
Lango is an application for learning Chinese words. After logging in, users can enter the English words in the left box of the page, and then the corresponding Chinese words translated from Google Cloud Translation API will be displayed in the right box. Users can first store the words they want to learn, and then click the button Start Review in the upper left corner of the page to test themselves.





## Make your own "Lango" app
### Configuration
In ./config/keys.js
1. Get oauth2 client keys (clientID & clientSecret) following the instruction in ./"Getting Oauth2 Client Keys.pdf". (Google API Dashboard: https://console.developers.google.com/apis/dashboard)
2. Make up your own cookieKey (any random string is ok. e.g. "my lango app")
3. Get an API key following the instruction in ../Flashcards Part 1/"Getting an API key for a Google Cloud API.pdf"

### Compilation
Run the following command to compile jsx in root directory:
```sh
npx babel --watch user/src --out-dir user --presets react-app/prod
```

### Intallation
Install node modules if not done yet
```sh
npm install
```

## Usage
```sh
node flashcardServer.js
```

## Start Point
To access the page for the students enrolled in ECS 162. Note: replace 53119 with your own port number.
http://server162.site:53119/login.html

If encounter "events.js:160 throw er; // Unhandled 'error' event", stop the running dashboard
```sh
killall -9 node 
```

## Contributing

Pull requests are welcome. For major changes, please open an [issue](https://github.com/kaiyanl/web-programming/issues) first to discuss what you would like to change.

## Show your support

Give a ⭐️ if this project helped you!
