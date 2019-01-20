var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model('User');
/* GET users listing. */
router.get("/", (req, res, next) => {
  if (req.session.userId) {
    User.findById(req.session.userId, (err, user) => {
      if (err) return res.status(400).send(err);
      req.user = user;
      res.locals.user = user;
    });
    next();
    return;
  }
  res.redirect("/login");
});


// user User */



module.exports = router;
