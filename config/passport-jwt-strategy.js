const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../model/user');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codial'
};

passport.use(new JWTStrategy(opts, async function(jwtpayload, done) {
    try {
        const user = await User.findById(jwtpayload._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log('There is some error', err);
        return done(err, false);
    }
}));

module.exports = passport;
