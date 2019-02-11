var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

let userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  image: String,
  following: false
});

userSchema.pre("save", function(next) {
  var user = this;
  if (this.password) {
    bcrypt.hash(user.password, 10, (err, data) => {
      // if(err) res.send(err);
      user.password = data;
      next();
    });
  } else {
    next();
  }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
