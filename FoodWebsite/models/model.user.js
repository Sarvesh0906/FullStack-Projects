const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected from User...'))
    .catch(err => console.error('MongoDB Connection Error:', err)
);



// Define Mongoose Schema

// SIGNUP SCHEMA
const SignupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    repeatPassword: {
        type: String,
        required: true
    }
});

const users = new mongoose.model('User', SignupSchema);


// Exporting the Mongoose Schemas
module.exports = users;
