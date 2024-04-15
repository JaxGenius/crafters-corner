// models/Shopfront.js
const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

// We want a new shopfront to be created with each user creation. It will be empty at first.
// This will draw from the default shopfront that we have created.

let Shopfront = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    template: {
        type: String,
        default: 'defaultShopfront.html'
    },
    products: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    },
    description: {

        type: String,
        default: 'Hello! Welcome to my shopfront!'
    }
}, {
    collection: 'shopfronts'
});

module.exports = mongoose.model('Shopfront', Shopfront);