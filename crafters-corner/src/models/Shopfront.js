const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Shopfront = new Schema({
    price: {
        type: Number
    },
    products: {
        type: Array
    },
    image: {
        type: String
    }, 
    userId: {
        type: String
    }
},{
    collection: 'shopfronts'
});

module.exports = mongoose.model('Shopfront', Shopfront);