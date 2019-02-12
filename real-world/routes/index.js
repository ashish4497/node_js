var express = require("express");
var router = express.Router();
var User = require("../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


// create middleware for check token valid or not

var validToken = (req, res, next) => {
	var token = req.headers.token;
	jwt.verify(token, "shhhhh", function(err, decode) {
		if (err) return res.json("invalid Token")
		// console.log(decode, "token");
		var username = decode.username;
		User.findOne({username: username}, (err, user) => {
			if(err) return res.json({error: 'user not found'})
			req.user = user;
		})
		next()
	});
}

/* user signUp and Login*/
router.get("/", function(req, res, next) {
	res.render("index", { title: "check" });
});

router.post("/api/users", function(req, res) {
	var newUser = new User(req.body);
	// console.log(req.body)
	newUser.save((err) => {
		if (err) res.send(err);
		if (!err) res.json({user:req.body});
	});
});

router.post("/api/users/login", function(req, res, next) {
	// res.send(req.body)
//  req.session.username = req.body.username 
	User.findOne({ username: req.body.username }).exec(function(err, user) {
		if (err) res.send(err);
		if (!user) {
			res.json({user:req.body})
		}
		// console.log(req.body.password,"9999999999999999", user.password, user)
		bcrypt.compare(req.body.password, user.password, function(err, valid) {
			// console.log(valid,"=============")
			if (!valid) {
				return res.status(404).json({
					error: true,
					message: "Username or Password is Wrong"
				});
			} else {
				var token = jwt.sign({ username : user.username }, "shhhhh");
				res.json({token:token});
			}
		});
		// res.end()
	});
});

module.exports = router;
