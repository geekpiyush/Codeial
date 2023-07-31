const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');

passport.use(new googleStrategy(
    {
        clientID: "277028958329-kn6k1b8gqe9kh51crqvmsho1e0c50k7a.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    async function (accessToken, refreshToken, profile, done) {
        try {
            // find user
            let user = await User.findOne({ email: profile.emails[0].value }).exec();
            console.log(profile);
            if (user) {
                // if user is found set this user as req.user
                return done(null, user);
            } else {
                // if user is not found, create a new user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });

                return done(null, user);
            }
        } catch (err) {
            console.log('error in creating user google strategy-passport', err);
            return done(err, false);
        }
    }
));
