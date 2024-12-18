const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userName: String,
  text: String,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  reviews: [ReviewSchema], 
});

module.exports = mongoose.model('Product', ProductSchema);
