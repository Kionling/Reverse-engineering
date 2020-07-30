// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
//For information sake, password hashing is essentially a scrambled text version of a user's password. 
//Based on how the hashing is unscrambled
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      //The type is defined here so that the database can determine what kind of value is the email.
      //We could say INTEGER or BOOLEAN but that will give us an error. Here we define email as a STRING
      type: DataTypes.STRING,
      //tells the database tto not accept null value
      allowNull: false,
      //WE're defining the unique constraint to be true
      unique: true,
      //We are validating the using the built in method of isEmail
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      //The password datatype is set to a STRING value
      type: DataTypes.STRING,
      //prevents the password to be NULL
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    //This is creating a hashed password and comparing it to the unhashed
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    //Here the process of creating a hashed password is created BEFORE the user inputs 
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
