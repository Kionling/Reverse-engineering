// Requiring necessary npm packages
//These npm packages import the functionality of the packages.
//==========================
//Express is an npm package that allows the user to program server-side logic and give the server a set of instructions to follow.
//It allows the user to utilize server routes as well
var express = require("express");
// =========================

var session = require("express-session");
// --------------------------------
// Requiring passport as we've configured it
//This is requiring the passport.js file in the configuration directory.
// Passport.js is the script file that contains the email and password database instructions
var passport = require("./config/passport");
//-------------------------

// Setting up port and requiring models for syncing
//============================
//Port works as a placeholder for port numbers. 
//Here we define it with process.env.PORT and 8080.
//Process.env.PORT is a flexible port method that allows the server to communicate with the server.js file to find the most convienient port slot available for the user.
//When testing locally the value of 8080 is used directly for the local server to use. If multiple instances are running on the port number (look below)
//Then the script file will send an error stack message stating that the address is already in use
var PORT = process.env.PORT || 8080;
//===========================
// ------------------------------
//This imports the directory of models. Models contains two script files (index.js, user.js)
//The model folder contains scripts that dynamically update the database, dependent on user inputs. 
//Both contain the logic for the application as a whole
var db = require("./models");
//-------------------------------
// Creating express app and configuring middleware needed for authentication
//=====================
//this is why we have exported the express library. The keyword express(); is a express npm package function

var app = express();
//=====================
//---------------------
//Using express this section handles json parsing.
//When urlencoded is set to true this enables querystring (more specific = qs library) parsing from the URL-encoding data
app.use(express.urlencoded({ extended: true }));
//This is a built in method using express that allows express to recognize a incoming request as a JSON object
app.use(express.json());
//express.static is middleware that the user helps express define and serve static files. 
app.use(express.static("public"));
//-----------------------------------
// We need to use sessions to keep track of our user's login status
//This is using the express-session functionality keywords that were imported to us
//app.use session is used to sign cookie data to prevent any tampering with the cookie data.
//Secret is essentially a cookie data signiture 
//When saveUninitialized is set to true, this is saying that at the end of the session the session will be stored in an object and then into a database. 
//Resave allows the session to recognize a logged in user, and one who hasn't. This will change the state of the session. 
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
//This is using express to initialize passport
app.use(passport.initialize());
//An acting middleware that changes the state of the session's req object
app.use(passport.session());

// Requiring our routes
//html routes scripts are used to create various routes to various different pages 
require("./routes/html-routes.js")(app);
//Here post,get,put,delete routes are defined through route strings.
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  //excutes a sequelize function before listening to the server.
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
