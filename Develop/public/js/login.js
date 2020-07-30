$(document).ready(function() {
  // Getting references to our form and inputs

  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    // prevents values from returning to their original/default values
    event.preventDefault();
    //The user  data object is used to stoer the trimmed values from the userinput into an object
    var userData = {
      //.val retrives the text input 
      //.trim removes any extra spaces the user may have accidentally inserted
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    // If the user email and password do not match then no values will be returned
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    //The psot method will send any information that the user has inputted into the specified route.
    //this route will later define the informtation and covert the information into a json .
    $.post("/api/login", { 
      //specifying which datatypes I would post to the route
      email: email,
      password: password
    })
    //"After everything"
      .then(function() {
        //Relocate and redirect the user to the members route
        window.location.replace("/members");
        // If there's an error, log the error
      }//Using the built in method of err, if there is an error the window will console log the error
      .catch(function(err) {
        console.log(err);
      });
  }
});
