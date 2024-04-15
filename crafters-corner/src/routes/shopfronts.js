// routes/shopfronts.js

const express = require('express');
const router = express.Router();
const Shopfront = require('../models/Shopfront');

// Method to get a shopfront by owner id
router.get('/:id', (req, res) => {
    Shopfront.findOne({ owner: req.params.id })
        .then(shopfront => res.json(shopfront))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Method to update a shopfront description by owner id
router.post('/update/:id', (req, res) => {
    Shopfront.findOneAndUpdate({ owner: req.params.id }, { description: req.body.description })
        .then(() => res.json('Shopfront description updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;