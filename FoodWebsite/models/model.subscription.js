const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected from Subscription...'))
    .catch(err => console.error('MongoDB Connection Error:', err)
);



// Define Mongoose Schema

// SUBSCRIPTION SCHEMA
const SubscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

const subscriptions = new mongoose.model('Subscription', SubscriptionSchema);


// Exporting the Mongoose Schemas
module.exports = subscriptions;
