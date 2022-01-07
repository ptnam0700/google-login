const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const passport = require("passport")

const GOOGLE_CLIENT_ID = "596401282037-th1knp1dpfbqna3nfimucogjtadpsvuc.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const FACEBOOK_APP_ID = "618591472556014"
const FACEBOOK_APP_SECRET = "0a79feb458a26c7eaf0fabf0c2bb0025"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "auth/facebook/callback"
},

function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));
//use this to parse our session 
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})