const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for collection model
const collectionSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    minLength: 3,
    maxLength: 100,
  },
  description: { type: String },
  src:{type:String}
});

collectionSchema.virtual("url").get(function () {
  return "/item/" + this._id; // this refers to the current item object
});

module.exports = mongoose.model("Collection", collectionSchema);
