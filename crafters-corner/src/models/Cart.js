// models/Cart.js
const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

let Cart = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    products: {
        type: Array,
        default: []
    },
    subtotal: {
        type: Number,
        default: 0
    }
}, {
    collection: 'carts'
});

module.exports = mongoose.model('Cart', Cart);