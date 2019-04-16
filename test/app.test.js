const request = require('supertest');
const app = require('../lib/app.js');
const Profile = require('../lib/models/Profile.js');
const getQuote = require('../lib/services/futuramaApi');

describe('api call', () => {
  it('gets a quote by character', () => {
    return getQuote('bender')
      .then(quote => {
        expect(quote).toEqual(expect.any(String));
      });
  });
});


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
  it('returns all profiles', () => {
    return request(app)
      .post('/profiles')
      .send({
        name: 'bonnie',
        favoriteCharacter: 'Bender'
      })
      .then(() => {
        return request(app)
          .get('/profiles');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('finds profile by id', () => {
    return request(app)
      .post('/profiles')
      .send({
        name: 'bonnie',
        favoriteCharacter: 'Bender'
      })
      .then(res => res.body._id)
      .then(id => {
        return request(app)
          .get(`/profiles/${id}`);
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


  it('updates favorite character by profile id', () => {
    return request(app)
      .post('/profiles')
      .send({
        name: 'bonnie',
        favoriteCharacter: 'Bender'
      })
      .then(res => res.body._id)
      .then(id => {
        return request(app)
          .patch(`/profiles/${id}`)
          .send({
            favoriteCharacter: 'fry'
          });
      })
      .then(res => {
        expect(res.body.favoriteCharacter).toEqual('fry');
        expect(res.body.tagline).toEqual(expect.any(String));
      });

  });





});
