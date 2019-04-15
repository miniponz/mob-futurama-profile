const request = require('superagent');
function getQuote(favoriteCharacter) {
  return request
    .get(`http://futuramaapi.herokuapp.com/api/characters/${favoriteCharacter}/1`)
    .then(res => res.body[0].quote);
}

module.exports = getQuote;
