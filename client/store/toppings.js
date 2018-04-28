import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_TOPPINGS = 'GET_TOPPINGS';

/**
 * INITIAL STATE
 */
const defaultToppings = [];

/**
 * ACTION CREATORS
 */
const stockToppings = toppings => ({type: GET_TOPPINGS, toppings});

/**
 * THUNK CREATORS
 */

export const retrieveToppings = () =>
  dispatch =>
    axios.get('/api/toppings')
      .then(res =>
        dispatch(stockToppings(res.data)))
      .catch(console.error.bind(console));

/**
 * REDUCER
 */
export default function (state = defaultToppings, action) {
  switch (action.type) {
    case GET_TOPPINGS:
      return action.toppings;
    default:
      return state;
  }
}
