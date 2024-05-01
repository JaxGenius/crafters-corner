// routes/images.js

const express = require('express');
const multer = require('multer');
const router = express.Router();
const Product = require('../models/Product');

// Setting up multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Image upload endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Send file information back to the client
  res.status(200).send(req.file);
});

module.exports = router;