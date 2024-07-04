const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected from Reservation...'))
    .catch(err => console.error('MongoDB Connection Error:', err)
);



// Define Mongoose Schema

// RESERVATION SCHEMA
const ReservationSchema = new mongoose.Schema({
    persons: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    }
});

const reservations = new mongoose.model('Reservation', ReservationSchema);


// Exporting the Mongoose Schemas
module.exports = reservations;
