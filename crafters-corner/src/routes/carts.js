// routes/carts.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

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
router.post('/cart/checkout/:id', async (req, res) => {
    try {
        const cart = await Cart.findOne({ owner: req.params.id });
        if (!cart) {
            return res.status(400).json('Error: could not find cart');
        }

        // Fetch the user and subtract the subtotal from their balance
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json('Error: could not find user');
        }
        user.balance -= cart.subtotal;
        if (user.balance < 0) {
            return res.status(400).json('Error: insufficient balance');
        }
        // Set the sold field to true for each product
        for (let product of cart.products) {
            await Product.findByIdAndUpdate(product, { sold: true });
        }
        // Reset subtotal to 0 as no products are in the cart
        cart.subtotal = 0;
        // Save the updated user
        await user.save();
        // Clear the cart and save it
        cart.products = [];
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(400).json('Error: could not checkout cart ' + err);
    }
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