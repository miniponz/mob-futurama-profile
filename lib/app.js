const express = require('express');
const profileRoutes = require('./routes/profiles');
const app = express();

app.use(express.json());
app.use('/profiles', profileRoutes);

module.exports = app;
