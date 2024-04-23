// routes/shopfronts.js

const express = require('express');
const router = express.Router();
const Shopfront = require('../models/Shopfront');

// Method to get a shopfront by owner id
router.get('/shopfront/:id', (req, res) => {
    Shopfront.findOne({ owner: req.params.id })
        .then(shopfront => res.json(shopfront))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Method to update a shopfront description by owner id
router.post('/shopfront/update/:id', (req, res) => {
    Shopfront.findOneAndUpdate({ owner: req.params.id }, { description: req.body.description })
        .then(() => res.json('Shopfront description updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Method to add a product to a shopfront by owner id
router.post('/shopfront/add-product/:id', (req, res) => {
    Shopfront.findOne({ owner: req.params.id })
        .then(shopfront => {
            shopfront.products.push(req.body.productID);
            return shopfront.save();
        })
        .then(() => res.json('Product added to shopfront!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;