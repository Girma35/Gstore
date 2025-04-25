const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true  // ensures no duplicate product IDs
  },
  title: {
    type: String,
    required: true  // ensures the title is always provided
  },
  price: {
    type: Number,
    required: true  // ensures the price is always provided
  },
  description: {
    type: String,
    required: true  // ensures a description is always provided
  },
  category: {
    type: String,
    required: true  // ensures the category is always provided
  },
  image: {
    type: String,
    required: true  // ensures an image URL is always provided
  },
  rating: {
    rate: {
      type: Number,
      required: true  // ensures the rating rate is always provided
    },
    count: {
      type: Number,
      required: true  // ensures the rating count is always provided
    }
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
