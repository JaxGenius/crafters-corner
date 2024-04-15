// routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Method to create a product
router.post('/products/create', (req, res) => {
    const newProduct = new Product({
        shopfrontID: req.body.shopfrontID,
        imgSrc: req.body.imgSrc,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        tags: req.body.tags
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GETTERS

// Method to get a product by product id
router.get('/products/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});


// SETTERS

// Method to update product image by product id
router.post('/products/update/image/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { imgSrc: req.body.imgSrc })
        .then(() => res.json('Product image updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Method to update product name by product id
router.post('/products/update/name/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { name: req.body.name })
        .then(() => res.json('Product name updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Method to update product description by product id
router.post('/products/update/description/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { description: req.body.description })
        .then(() => res.json('Product description updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Method to update product price by product id
router.post('/products/update/price/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { price: req.body.price })
        .then(() => res.json('Product price updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;