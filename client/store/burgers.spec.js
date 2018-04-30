/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {retrieveBurgers, postBurger, putBurger, deleteBurger} from './burgers';
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

  describe('postBurger', () => {
    it('eventually dispatches the ADD BURGER action', () => {
      const fakeBurger = {name: 'burger1'};
      mockAxios.onPost('/api/burgers').replyOnce(200, fakeBurger);
      return store.dispatch(postBurger(fakeBurger))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('ADD_BURGER');
          expect(actions[0].burger).to.be.deep.equal(fakeBurger);
        });
    });
  });

  describe('putBurger', () => {
    it('eventually dispatches the EDIT BURGER action', () => {
      const fakeBurger = {name: 'burger1', id: 1};
      mockAxios.onPut(`/api/burgers/${fakeBurger.id}`).replyOnce(200, fakeBurger);
      return store.dispatch(putBurger(fakeBurger))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('EDIT_BURGER');
          expect(actions[0].burger).to.be.deep.equal(fakeBurger);
        });
    });
  });

  describe('deleteBurger', () => {
    it('eventually dispatches the REMOVE BURGER action', () => {
      const fakeBurgerId = 1;
      mockAxios.onDelete(`/api/burgers/${fakeBurgerId}`).replyOnce(204);
      return store.dispatch(deleteBurger(fakeBurgerId))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('REMOVE_BURGER');
          expect(actions[0].id).to.be.deep.equal(fakeBurgerId);
        });
    });
  });
});
