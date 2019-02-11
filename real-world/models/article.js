var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var slug = require('slug');

let articleSchema = new Schema({
  slug: String,
  title: {type:String},
  description: {type: String},
  body: {type:String},
  tagList :[],
  createdAt : {type:Date, default:Date.now()},
  updatedAt: {type: Date, default: Date.now()},
  favorited: false,
  favoritesCount:{type:Number, default:0},
  author : [{type:Schema.Types.ObjectId, ref:'User'}]
});

//apply slug
articleSchema.pre('save', function(next){
  this.slug = slug(this.title);
  console.log("=========",this.slug);
  next()
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
