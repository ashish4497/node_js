var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug');

var blogSchema = new Schema({
  title : {type:String },
  description : {type:String},
  likes :[{type:Schema.Types.ObjectId, ref: 'User'}],
  tag:[String],
  date:{type: Date, default: Date.now()},
  comments:[{type:Schema.Types.ObjectId, ref:'Comment'}],
  slug : String,
  author : {type:Schema.Types.ObjectId, ref:'User'}
}) 

// apply prehook slug middleware
blogSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});


// defining of model
var blog = mongoose.model('blog',blogSchema);
module.exports = blog;
