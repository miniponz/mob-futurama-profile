const request = require('supertest');
const app = require('../lib/app.js');
const Profile = require('../lib/models/Profile.js');

describe('testing routes', () => {
  afterEach(() => {
    return Profile.drop();
  });
  it('creates a new profile', () => {
    return request(app)
      .post('/profiles')
      .send({
        name: 'bonnie',
        favoriteCharacter: 'Bender'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'bonnie',
          favoriteCharacter: 'Bender',
          tagline: expect.any(String),
          _id: expect.any(String)
        });
      });
  });

  
});
