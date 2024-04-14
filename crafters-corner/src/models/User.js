// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    Products: {
        type: Array
    },
    Shopfront: {
        type: String,
        default: "default"
    },
    email: {
        type: String
    },
    Cart: {
        type: String,
        default: "default"
    },
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);