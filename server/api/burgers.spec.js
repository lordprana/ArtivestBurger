/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const app = require('../index');

describe('Burger routes', () => {

  describe('/api/burgers/', () => {
    let mockAxios;

    beforeEach(() => {
      mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
      mockAxios.restore();
    });

    it('GET /api/burgers', () => {
      const burgerName = 'burger1';
      const fakeBurgers = [{name: burgerName}];
      mockAxios.onGet('https://vast-brushlands-48771.herokuapp.com/api/burgers/').replyOnce(200, fakeBurgers);
      return request(app)
        .get('/api/burgers')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(burgerName);
        });
    });

    it('POST /api/burgers', () => {
      const burgerName = 'burger1';
      const fakeBurgers = [{name: burgerName}];
      mockAxios.onPost('https://vast-brushlands-48771.herokuapp.com/api/burgers/').replyOnce(200, fakeBurgers);
      return request(app)
        .post('/api/burgers')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(burgerName);
        });
    });

    it('PUT /api/burgers', () => {
      const burgerName = 'burger1';
      const fakeBurgers = [{name: burgerName}];
      mockAxios.onPut('https://vast-brushlands-48771.herokuapp.com/api/burgers/1/').replyOnce(204, fakeBurgers);
      return request(app)
        .put('/api/burgers/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(burgerName);
        });
    });

    it('DELETE /api/burgers', () => {
      mockAxios.onDelete('https://vast-brushlands-48771.herokuapp.com/api/burgers/1/').replyOnce(204);
      return request(app)
        .delete('/api/burgers/1')
        .expect(204);
    });
  }); // end describe('/api/burgers')
}); // end describe('Burger routes')
