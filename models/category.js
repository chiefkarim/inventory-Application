const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for category model
const CategorySchema = new Schema({
    name: {type:String, unique:true,require:true,minLength:3, maxLength: 100},
    description:{type:String}
})

CategorySchema.virtual("url").get(function () {
    return "/catalog/item/" + this._id; // this refers to the current item object
  });

module.exports=mongoose.model('Category',CategorySchema);