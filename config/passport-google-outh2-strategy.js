const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');

// creating a strategy
passport.use(new googleStrategy({

    clientID: '277028958329-kn6k1b8gqe9kh51crqvmsho1e0c50k7a.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'

}, async function(accessToken, refreshToken, profile, done) {
    try {
        const existingUser = await User.findOne({email: profile.emails[0].value});
        // if user found
        if (existingUser)
        {
            return done(null, existingUser);
        } 
        else
        {
            // when user is not found, create a new user
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });

            return done(null, newUser);
        }
    } catch (error) {
        console.log('Error in Google strategy passport:', error);
        return done(error, null);
    }
}));

module.exports = passport;
