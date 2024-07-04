const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected from Contact...'))
    .catch(err => console.error('MongoDB Connection Error:', err)
);



// Define Mongoose Schema

// CONTACT SCHEMA
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const contacts = new mongoose.model('Contact', ContactSchema);


// Exporting the Mongoose Schemas
module.exports = contacts;
