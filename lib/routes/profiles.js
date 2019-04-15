const { Router } = require('express');
const Profile = require('../models/Profile');
const getQuote = require('../services/futuramaApi.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      favoriteCharacter
    } = req.body;
    return getQuote(favoriteCharacter)
      .then(quote => {
        Profile
          .create({ name, favoriteCharacter, tagline: quote })
          .then(createdProfile => res.send(createdProfile));
      })
      .catch(err => next(err));
  });
