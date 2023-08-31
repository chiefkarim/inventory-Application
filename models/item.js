const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for Item model

const ItemSchema = new Schema({
  name: { type: String, require: true ,minLength:3, maxLength: 100},
  description: { type: String, require: true },
  category: { type: Schema.Types.ObjectId, ref: "Collection", require: true },
  price: { type: Number, require: true },
  stock: { type: Number },
  src:{type:Array}
});

ItemSchema.virtual("url").get(function () {
  return "/catalog/item/" + this._id; // this refers to the current item object
});
module.exports = mongoose.model("Item", ItemSchema);
