const express = require('express');
const bcrypt = require('bcrypt');
const users = require('./models/model.user');
const reservations = require('./models/model.reservation');
const contacts = require('./models/model.contact');
const subscriptions = require('./models/model.subscription');
const recipes = require('./models/model.recipe');

const router = express.Router();

// Routes
router.get('/', (req, res) => {
    res.render('index.html');
});
router.get('/home', (req, res) => {
    res.render('index.html');
});
router.get('/login', (req, res) => {
    res.render('login.html');
});
router.get('/signup', (req, res) => {
    res.render('signup.html');
});
router.get('/contact', (req, res) => {
    res.render('contact.html');
});
router.get('/recipe', (req, res) => {
    res.render('recipe.html');
});

// Endpoints for Login and Signup
router.post('/signup', async (req, res) => {
    try {
        const password = req.body.password;
        const repeatPassword = req.body.repeatPassword;

        // Check if the user already exists in the database
        const checkUser = await users.findOne({ username: req.body.username, email: req.body.email });
        if (checkUser) {
            return res.status(400).json({ message: 'User already exists. Please enter different credentials for Registration.' });
        } else {
            if (password === repeatPassword) {
                const registerEmployee = new users({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    repeatPassword: req.body.repeatPassword
                });

                // Hashing Password
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(registerEmployee.password, saltRounds);
                registerEmployee.password = hashedPassword;
                registerEmployee.repeatPassword = hashedPassword;

                const registered = await registerEmployee.save();
                res.status(201).render('login.html');
            } else {
                res.send('Invalid Registration');
            }
        }

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(400).send('Invalid Registration');
    }
});

// Login Check
router.post('/login', async (req, res) => {
    try {
        // Check if the user exists in the database
        const checkUser = await users.findOne({ username: req.body.username });
        if (!checkUser) {
            return res.status(400).json({ message: 'User does not exist. Please Signup.' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(req.body.password, checkUser.password);
        if (isPasswordValid) {
            res.status(201).render('index.html');
        } else {
            return res.status(400).send('Invalid Login');
        }

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoints for Reservation
router.post('/reservation', async (req, res) => {
    const newReservations = new reservations({
        persons: req.body.persons,
        date: req.body.date,
        timing: req.body.timing
    });

    try {
        const reservation = await newReservations.save();
        res.status(201).json({ message: 'Reservation Successful' });
    } catch (error) {
        console.error('Reservation Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoints for Subscription
router.post('/subscription', async (req, res) => {
    // Check if the user exists in the database
    const checkUser = await subscriptions.findOne({ email: req.body.email });
    if (checkUser) {
        return res.status(400).json({ message: 'You are already Subscribed for offers and notifications.' });
    }

    // ADD Subscription details into database
    const newSubscriptions = new subscriptions({
        email: req.body.email
    });

    try {
        const subscription = await newSubscriptions.save();
        res.status(201).json({ message: 'You are now Subscribed for offers and notifications.' });
    } catch (error) {
        console.error('Subscription Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoints for Contact
router.post('/contact', async (req, res) => {
    const newContact = new contacts({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    try {
        const contact = await newContact.save();
        res.status(201).json({ message: 'Your message is sent successfully.' });
    } catch (error) {
        console.error('Contact Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoints for Recipes
router.post('/addRecipes', async (req, res) => {
    const newRecipes = new recipes({
        name: req.body.name,
        ingrediants: req.body.ingrediants,
        instructions: req.body.instructions
    });

    try {
        const contact = await newRecipes.save();
        res.status(201).json({ message: 'Your Recipe is saved successfully.' });
    } catch (error) {
        console.error('Contact Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
