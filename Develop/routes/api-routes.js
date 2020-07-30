// Requiring our models and passport as we've configured it
//The model folder contains scripts that dynamically update the database, dependent on user inputs. 
var db = require("../models");
//This is requiring the passport.js file in the configuration directory.
// Passport.js is the script file that contains the email and password database instructions
var passport = require("../config/passport");

//We are exporting a function that contains the parameter of app. This script file does not contain the express dependency. 
//However will use the function that has imported the express directory and will be express-friendly when this file is referenced (specifically in the server.js file)
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  //this is an post method that will send the user input data to the route and convert the response into a json object
  /// passport authenticate authenticates the user login values using a local strategy
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log(req.user)
    //Turns user turns the req.user into a json object
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  //this is a post route method for the sign up page. This route is used as a "append information route" that will
  //update the db dynamically.
  app.post("/api/signup", function(req, res) {
    //this create method is using the db models folder, the User object, and dynamically updating the database,
    //adding a new user
    db.User.create({
      //here we are giving the request body a place to append the information into the databses
      email: req.body.email,
      password: req.body.password
    })
    //We are then saying "Once this process is done updating, do this: "
      .then(function() {
        //status 307 is a built in status message that means temporary redirect to the api login route
        res.redirect(307, "/api/login");
      })
      //.catch returns a promise and is only used when there are errors. For this instance error 401 is prompted
      //meaning that it is an unauthorized method.
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  //this route retrieved the logout route by using .get method
  //takes in the parameters req, res menaing request adn response
  app.get("/logout", function(req, res) {
    //when the user makes a request to logout from the html this built in function of .logout is initiated
    //then ends the session and redirects the user back to the home page. 
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  //This route uses a retrival method know as .get to retrive the information that has been sent to an api route. 
  //Here we are retriving the user data.
  app.get("/api/user_data", function(req, res) {
    //If there is no user present then the response will be an empty json object
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      //This is send back a user's information based on the session status (Whether there is a user logged in.)
      //it is sending back specifics (email and password)
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
