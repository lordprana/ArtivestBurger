import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_BURGERS = 'GET_BURGERS';
const REMOVE_BURGER = 'REMOVE_BURGER';
const ADD_BURGER = 'ADD_BURGER';
const EDIT_BURGER = 'EDIT_BURGER';

/**
 * INITIAL STATE
 */
const defaultBurgers = [];

/**
 * ACTION CREATORS
 */
const stockBurgers = burgers => ({type: GET_BURGERS, burgers});

/**
 * THUNK CREATORS
 */

export const retrieveBurgers = () =>
  dispatch =>
    axios.get('/api/burgers')
      .then(res =>
        dispatch(stockBurgers(res.data)))
      .catch(console.error.bind(console));

/**
 * REDUCER
 */
export default function (state = defaultBurgers, action) {
  switch (action.type) {
    case GET_BURGERS:
      return action.burgers;
    default:
      return state;
  }
}
