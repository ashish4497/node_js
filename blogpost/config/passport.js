var express = require("express");
var router = express.Router();
var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");
//require('../routes/index');


//passport 
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID:"841143af40190a8945b4",
    clientSecret:"ec0d01683aa097e0628b87dc9e242b4e31002466",
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile)
    User.findOne({ email: profile.emails[0].value }, function (err, user) {
      if(!user){
        var newUser = new User({
          username: profile.username,
          email: profile.emails[0].value,
          password: profile.username
        })
        newUser.save((err, user) => {
          return cb(err, user);
        })
      }
      else return cb(err, user);
    });
  }
));
// router.get('/auth/github',
//   passport.authenticate('github'));
// router.get('/auth/github/callback', 
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


  passport.serializeUser(function(user, done){
    done(null, user._id);
  })
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
      done(err, user);
    })
  })

module.exports = passport;