// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(4000, function() {
    console.log("Server is running on Port: 4000");
});

app.post('/users/add', (req, res) => {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

app.delete('/users/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send();
            }
            return res.status(200).send();
        })
        .catch(err => {
            return res.status(500).send(err);
        });
});