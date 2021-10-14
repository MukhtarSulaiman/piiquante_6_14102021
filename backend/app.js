const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://new-user-1:n8jdkdmabrEJGVN4@cluster0.jmsjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true, 
    useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use((req, res) => {
    res.json({ message: "It's working too ...!"})
});

module.exports = app;