const express = require('express');


const app = express();

app.use((req, res) => {
    res.json({ message: "It's working too ...!"})
});

module.exports = app;