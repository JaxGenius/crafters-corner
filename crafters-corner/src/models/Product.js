// models/Product.js
const mongoose = require('mongoose');
const Shopfront = require('./Shopfront');
const Schema = mongoose.Schema;

let Product = new Schema({
    shopfrontID: {
        type: Schema.Types.ObjectId,
        ref: Shopfront
    },
    imgSrc: {
        type: String,
        default: "placeholder.jpg"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    }
}, {
    collection: 'products'
});

module.exports = mongoose.model('Product', Product);