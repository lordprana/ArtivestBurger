/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const app = require('../index');

describe('Topping routes', () => {

  describe('/api/toppings/', () => {
    let mockAxios;

    beforeEach(() => {
      mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
      mockAxios.restore();
    })

    it('GET /api/toppings', () => {
      const toppingName = 'tuna';
      const fakeToppings = [{name: toppingName}];
      mockAxios.onGet('https://vast-brushlands-48771.herokuapp.com/api/toppings/').replyOnce(200, fakeToppings);
      return request(app)
        .get('/api/toppings')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(toppingName);
        });
    });
  }); // end describe('/api/toppings')
}); // end describe('Topping routes')
