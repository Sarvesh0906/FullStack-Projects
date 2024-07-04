const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected from Recipes...'))
    .catch(err => console.error('MongoDB Connection Error:', err)
);



// Define Mongoose Schema

// CONTACT SCHEMA
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingrediants: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
});

const recipes = new mongoose.model('Recipe', RecipeSchema);


// Exporting the Mongoose Schemas
module.exports = recipes;
