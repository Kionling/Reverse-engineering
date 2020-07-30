$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    //by referencing the specific class of memeber name the program recognizes what kind of data will be received 
    $(".member-name").text(data.email);
  });
});
