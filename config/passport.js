var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: 'email'
  },
  // {
  //   email: "email"
  // },
  function (username, password, done) {
    console.log('findOne in the db is next:');
    // When a user tries to sign in this code runs
    db.User.findOne({

      email: username

    }).then(function (dbUser) {
      console.log('findOne was successfullish for:', username, password, dbUser);
      // If there's no user with the given email
      if (!dbUser) {
        console.log('maybe not...');
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        console.log('password compared:', password )
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      console.log('at the end of local strategy.. ', username, password);
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
