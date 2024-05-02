const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const searchRoutes = require('./routes/search');
const cartRoutes = require('./routes/carts');
const shopfrontRoutes = require('./routes/shopfronts');
const imageRoutes = require('./routes/images');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://store-database:27017/local', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add the user routes to the server
app.use('/', userRoutes);

// Add the product routes to the server
app.use('/', productRoutes);

// Add the search routes to the server
app.use('/', searchRoutes);

// Add the cart routes to the server
app.use('/', cartRoutes);

// Add the shopfront routes to the server
app.use('/', shopfrontRoutes);

// Add the image routes to the server
app.use('/', imageRoutes);

// Serve the app on port 4000
app.listen(4000, function() {
    console.log("Server is running on Port: 4000");
});