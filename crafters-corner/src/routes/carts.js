// routes/carts.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Method to get a cart by owner id
router.get('/cart/:id', (req, res) => {
    Cart.findOne({ owner: req.params.id })
        .then(cart => res.json(cart))
        .catch(err => res.status(400).json('Error: could not find cart ' + err));
});

// Method to update a cart by owner id
router.post('/cart/update/:id', (req, res) => {
    Cart.findOne({ owner: req.params.id })
        .then(cart => {
            cart.products.push(req.body.product);
            cart.save()
                .then(updatedCart => res.json(updatedCart))
                .catch(err => res.status(400).json('Error: could not update cart ' + err));
        })
        .catch(err => res.status(400).json('Error: could not find cart ' + err));
});

module.exports = router;