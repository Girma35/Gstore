const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.product = require("./product/product-schema");
db.user = require("./user");
db.userType = require("./user-type");

module.exports = db;

