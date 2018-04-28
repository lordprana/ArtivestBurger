/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {retrieveToppings} from './toppings';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {toppings: []};

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('retrieveToppings', () => {
    it('eventually dispatches the GET TOPPINGS action', () => {
      const fakeToppings = [{name: 'tuna'}];
      mockAxios.onGet('/api/toppings').replyOnce(200, fakeToppings);
      return store.dispatch(retrieveToppings())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_TOPPINGS');
          expect(actions[0].toppings).to.be.deep.equal(fakeToppings);
        });
    });
  });
});
