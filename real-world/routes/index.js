var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Article = require("../models/article");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

/* user signUp and Login*/
router.get("/", function(req, res, next) {
  res.render("index", { title: "check" });
});

router.post("/api/users", function(req, res) {
  var newUser = new User(req.body);
  // console.log(req.body)
  newUser.save((err) => {
    if (err) res.send(err);
    if (!err) res.send("registered user success");
  });
});

router.post("/api/users/login", function(req, res, next) {
  // res.send(req.body)
  User.findOne({ username: req.body.username }).exec(function(err, user) {
    if (err) res.send(err);
    if (!err) {
      console.log(user);
    }
    // console.log(req.body.password,"9999999999999999", user.password, user)
    bcrypt.compare(req.body.password, user.password, function(err, valid) {
      // console.log(valid,"=============")
      if (!valid) {
        return res.status(404).json({
          error: true,
          message: "Username or Password is Wrong"
        });
      }
      var token = jwt.sign({ name: "username" }, "shhhhh");
      res.json(token);
    });
    // res.end()
  });
});

/* generate a token */

router.get("/api", function(req, res) {
  // console.log(req.headers.token, "============++++++++++");
  jwt.verify(req.headers.token, "shhhhh", function(err, decode) {
    if (err) console.log(err);
    console.log(decode, "token");
    res.render("index");
  });
});

/* article routes*/
// Article.find({},(err, data)=>{
//   console.log(data,"check the article schema")
// })

router.post('/api/article', function(req, res, next){
  var newArticle = new Article(req.body)
    newArticle.save((err)=>{
      if(err) res.send(err);
      if(!err) res.send("article saved success")
    })
})


module.exports = router;
