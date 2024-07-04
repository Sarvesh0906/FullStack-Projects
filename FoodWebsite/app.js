const express = require('express');
const path = require('path');
const routes = require('./routes'); // Import the routes

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware setup
app.use('/static', express.static('static'));
app.use('/img', express.static('img'));

// Set up view engine and directory for views
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Use the routes
app.use('/', routes);

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
