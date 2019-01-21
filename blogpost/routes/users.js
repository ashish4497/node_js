var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
// var User = mongoose.model('User');
var userFind = require("../Controllers/user");

/* GET users listing.  find user*/
router.get("/", userFind.findUser);

module.exports = router;
