/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {retrieveBurgers} from './burgers';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {burgers: []};

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('retrieveBurgers', () => {
    it('eventually dispatches the GET BURGERS action', () => {
      const fakeBurgers = [{name: 'burger1'}];
      mockAxios.onGet('/api/burgers').replyOnce(200, fakeBurgers);
      return store.dispatch(retrieveBurgers())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_BURGERS');
          expect(actions[0].burgers).to.be.deep.equal(fakeBurgers);
        });
    });
  });
});
