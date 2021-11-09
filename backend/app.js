const express = require('express'); // Importing the express framework
const bodyParser = require('body-parser'); // This package allows us to read the body of the request
const mongoose = require('mongoose'); // It facilates the interactions with the database
const dotenv = require('dotenv'); // A package that allow us to seprate our sensitive information
dotenv.config({ path: './config/.env' });
const path = require('path'); // This module provides utilities for files and directories paths

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Using the connect function to connect to our mongoDB database
mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.jmsjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, 
    useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

// Makes the api accesible for the frontend app
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// We use the method json to transfom the body of the request to a json object
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app; 