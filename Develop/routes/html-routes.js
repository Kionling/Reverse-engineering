// Requiring path to so we can use relative routes to our HTML files
//path allows the programmer to define the location of a directory
//we are storing the module path into a variable
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
//This is the config file that is dependent on the middleware script to define whether or not the user in on a restricted route
var isAuthenticated = require("../config/middleware/isAuthenticated");

//exporting a function with the argument of app, which will then be exported into another script file that has express imported as a dependency
module.exports = function(app) {

  app.get("/", function(req, res) {
    //This is the home route. Essentially as we call it, the home page.
    // If the user already has an account send them to the members page
    //This is a redirect method that allows an already existing user and its information to be redirected towards the "/members" route
    if (req.user) {
      res.redirect("/members");
    }
    //This is calling on the html file, "signup.html" to be ran and displayed to the designated route of "/"
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
//here we are creating the route of /login, which isn't a default page. A route of its own that has different elements appended, determined by its route.
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    //Like the home page, if the user already has an existing account then the page will send the user to the members route
    if (req.user) {
      res.redirect("/members");
    }
    //This is giving the route a specific html file to display based on the route by using the sendFile and path.join the directory
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
