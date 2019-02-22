var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var slug = require('slug');

let articleSchema = new Schema({
  slug: String,
  title: {type:String},
  description: {type: String},
  body: {type:String},
  tagList :[{type:String}],
  createdAt : {type:Date, default:Date.now()},
  updatedAt: {type: Date, default: Date.now()},
  favorited: false,
  favoritesCount:{type:Number, default:0},
  author :[{type:Schema.Types.ObjectId, ref:'User'}],
  comments:[{type:Schema.Types.ObjectId, ref:'Comment'}]
});

//apply slug
articleSchema.pre('save', function(next){
  this.slug = slug(this.title);
  next()
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
