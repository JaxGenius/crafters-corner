// routes/search.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Method to search for products
router.get('/search', (req, res) => {
    const query = req.query.q;
    Product.find({ name: { $regex: query, $options: 'i' } })
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

// method to search by category
router.get('/search/category', (req, res) => {
    const query = req.query.q;
    Product.find({ category: { $regex: query, $options: 'i' } })
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;