// require passport
const passport = require('passport');
// require local strategy
const LocalStrategy = require('passport-local').Strategy;
// require user
const User = require('../model/user');
const mongoose = require('mongoose');

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
      try {
        // find the user and establish the identity
        const user = await User.findOne({ email: email }).exec();

        if (!user || user.password !== password) {
          console.log('Invalid password or email');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
      }
    }
  )
);

// serializing the user to which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id).exec();
  
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      console.log('Error in finding the user --> passport');
      return done(err);
    }
  });
  
  // check if user is passport.authenticate

  passport.checkAuthentication = function(req,res,next)
  {
    // if the user is signed-in then pass the req to the next function
    if(req.isAuthenticated())
    {
      return next();
    }
    // if the user is not signed-in
    return res.redirect('/users/sign-in')
  }

  passport.setAuthenticatedUser = function(req,res,next)
  {
    if(req.isAuthenticated())
    {
      // req.user contains the current signed-in user from the session cookie 

      res.locals.user = req.user;
    }
    next();
  }

module.exports = passport;
