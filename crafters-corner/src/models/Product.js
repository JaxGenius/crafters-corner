const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    productID: {
        type: String
    },
    userID: {
        type: String
    },
    Name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    }
},{
    collection: 'products'
});

module.exports = mongoose.model('Product', Product);