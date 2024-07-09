const mongooes = require("mongoose");

const productSchema = mongooes.Schema({
  _id: mongooes.Schema.Types.ObjectId,
  name: String,
  price: Number,
});

module.exports = mongooes.model("ProductSchema", productSchema);
