// routes/carts.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Method to get a cart by owner id
router.get('/cart/:id', (req, res) => {
    Cart.findOne({ owner: req.params.id })
        .then(cart => res.json(cart))
        .catch(err => res.status(400).json('Error: could not find cart ' + err));
});

// Method to update a cart by owner id
router.post('/cart/update/:id', (req, res) => {
    Product.findById(req.body.product)
        .then(product => {
            Cart.findOne({ owner: req.params.id })
                .then(cart => {
                    cart.products.push(req.body.product);
                    cart.subtotal += product.price;
                    cart.save()
                        .then(updatedCart => res.json(updatedCart))
                        .catch(err => res.status(400).json('Error: could not update cart ' + err));
                })
                .catch(err => res.status(400).json('Error: could not find cart ' + err));
        })
        .catch(err => res.status(400).json('Error: could not find product ' + err));
});

// Method to remove a product from a cart by owner id
router.post('/cart/remove/:id', (req, res) => {
    Product.findById(req.body.product)
        .then(product => {
            Cart.findOne({ owner: req.params.id })
                .then(cart => {
                    cart.products = cart.products.filter(productId => productId.toString() !== req.body.product);
                    cart.subtotal -= product.price; // Subtract the product price from the subtotal
                    cart.save()
                        .then(updatedCart => res.json(updatedCart))
                        .catch(err => res.status(400).json('Error: could not remove product from cart ' + err));
                })
                .catch(err => res.status(400).json('Error: could not find cart ' + err));
        })
        .catch(err => res.status(400).json('Error: could not find product ' + err));
});

// Method to checkout a cart by owner id
router.post('/cart/checkout/:id', (req, res) => {
    Cart.findOne({ owner: req.params.id })
        .then(cart => {
            cart.products = [];
            cart.save()
                .then(updatedCart => res.json(updatedCart))
                .catch(err => res.status(400).json('Error: could not checkout cart ' + err));
        })
        .catch(err => res.status(400).json('Error: could not find cart ' + err));
});

// Method to check if a product is in a cart by owner id
router.post('/cart/check/:id', (req, res) => {
    Cart.findOne({ owner: req.params.id })
        .then(cart => {
            const inCart = cart.products.includes(req.body.product);
            res.json({ inCart });
        })
        .catch(err => res.status(400).json('Error: could not find cart ' + err));
});

module.exports = router;