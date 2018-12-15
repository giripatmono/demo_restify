const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');


const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    size: String,
    color: String
});

ProductSchema.plugin(timestamps);
ProductSchema.plugin(mongooseStringQuery);

module.exports = mongoose.model('Product', ProductSchema);