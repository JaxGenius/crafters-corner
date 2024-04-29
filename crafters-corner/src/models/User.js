// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', User);