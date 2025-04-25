const mongoose = require("mongoose");
const productSchema = require("./product-schema");
const schemaType = require("../../types");

const Product = mongoose.model("Product", productSchema);

// Export the model
module.exports = Product;
