

$(document).ready(function() {
  // Getting references to our form and input
  //The references will be retrived from these classes"
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  //simple validation of inputs
  //this gives the button signup a on  click event
  signUpForm.on("submit", function(event) {
    //prevents values from resetting
    event.preventDefault();
    //user data object that is retrived in the apiroutes script file
    var userData = {
      //trimming empty spaces in inputs and retriving their values with .val
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
  //If the users email and password do not match the connected information or do not equal each other
  //Input will return no value, not even an incorrect one
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    //When there is successful input then the information given from the userData will run the signup function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  //this function signsup the user and takes only the arguments of email and password
  function signUpUser(email, password) {
    //This is an append infortmation method known as post. Post sends information to an api
    //here we are telling the information to go to the signup api and only email and password will be sent
    $.post("/api/signup", {
      email: email,
      password: password
    })
    //we tell the url to change locations from the signup, to the members route
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      //this .catch deals only  with errors if there are none. it runs the function on handleloginerr that
      //will give the user a text alert on the page
      .catch(handleLoginErr);
  }
//is called upon in the .catch keyword if there is an error 
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
