// routes/search.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Method to search for products by matching various fields
router.get('/search/:q', (req, res) => {
    const query = req.params.q;
    Product.find({
        $or: [
            { name: { $regex: query, $options: 'i' } }, // checks q against name
            { description: { $regex: query, $options: 'i' } }, // checks q against description
            { tags: { $regex: query, $options: 'i' } }, // checks q against tags
            { category: { $regex: query, $options: 'i' } } // checks q against category
        ]
    })
    .then(products => {
        if (products.length === 0) {
            res.status(404).json('No products found matching ' + query);
        } else {
            res.json(products);
        }
    })
    .catch(err => {
        res.status(400).json('Error: ' + err);
    });
});

// Method to search by category
router.get('/search/category', (req, res) => {
    const query = req.query.q;
    Product.find({ category: { $regex: query, $options: 'i' } })
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;