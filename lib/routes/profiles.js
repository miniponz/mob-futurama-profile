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
  })
  .get('/', (req, res, next) => {
    return Profile
      .find()
      .then(profileList => res.send(profileList))
      .catch(err => next(err));
  })
  .get('/:id', (req, res, next) => {
    return Profile 
      .findById(req.params.id)
      .then(foundProfile => res.send(foundProfile))
      .catch(err => next(err));
  });
