// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Shopfront = require('../models/Shopfront');
const Cart = require('../models/Cart');

// Method to create a new User
router.post('/users/add', (req, res) => {
    // Check if username exists in database already before creating user.
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: 'Username already exists' });
            } else {
                if ((req.body.password).length >= 8) {
                    const newUser = new User(req.body);
                    newUser.save()
                        .then(() => {
                            // Create a new shopfront for the user
                            const newShopfront = new Shopfront({ 
                                owner: newUser._id,
                                ownerName: newUser.username
                            });
                            return newShopfront.save();
                        })
                        .then(() => {
                            // Create a new cart for the user
                            const newCart = new Cart({ owner: newUser._id });
                            return newCart.save();
                        })
                        .then(() => res.json('User created successfully.'))
                        .catch(err => res.status(400).json('Error: ' + err));
                } else {
                    // Return error if password is less than 8 characters long
                    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
                }
            }
        })
        .catch(err => res.status(500).json('500 Error' + err));
});

// Method to delete a user
router.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Method to get a user by ID
router.get('/users/:id', (req, res) => {
    // Figure out what fields are necessary to return in the response
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Method to log in a user

router.post('/login', (req, res) => {
    console.log('Login request received');
    const { username, password } = req.body;

    // Find user by username
    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }

            // Check password
            if (password === user.password) {
                // User matched
                res.json({ id: user._id }); // Return ObjectId of the user
            } else {
                return res.status(400).json({ error: 'Invalid username or password' });
            }
        })
        .catch(err => res.status(500).json('Error: ' + err));
});

// Method to update user balance
router.put('/users/updateBalance/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.balance += Number(req.body.balance);

            user.save()
                .then(() => res.json('Balance updated successfully.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Method to get user balance
router.get('/users/balance/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user.balance))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;