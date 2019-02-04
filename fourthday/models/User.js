var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

let userSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  age: { type: Number, required: true, max: 75 },
  email: { type: String, required: true, maxlength: 50 },
  description: { type: String, required: true },
  contactNo: { type: Number, required: true },
  password: { type: String, required: true }
});

// userSchema.pre("save", function(next) { 
//   var user = this;
//   console.log(this);
//   bcrypt.hash(user.password, 10, function(err, hash) {
//     if (err) return next(err);
//     user.password = hash;
//     console.log(user);
//   });
//   next();
// });;

userSchema.pre("save", function(next) { 
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});;

var User = mongoose.model("User", userSchema);
module.exports = User;
