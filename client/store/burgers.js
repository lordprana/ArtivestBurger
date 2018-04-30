import axios from 'axios';

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
const addBurger = burger => ({type: ADD_BURGER, burger});
const editBurger = burger => ({type: EDIT_BURGER, burger});
const removeBurger = id => ({type: REMOVE_BURGER, id});

/**
 * THUNK CREATORS
 */

export const retrieveBurgers = () =>
  dispatch =>
    axios.get('/api/burgers')
      .then(res =>
        dispatch(stockBurgers(res.data)))
      .catch(console.error.bind(console));

export const postBurger = (burger) =>
  dispatch =>
    axios.post('/api/burgers', burger)
      .then(res =>
        dispatch(addBurger(res.data)))
      .catch(console.error.bind(console));

export const putBurger = (burger) =>
  dispatch =>
    axios.put(`/api/burgers/${burger.id}`, burger)
      .then(res =>
        dispatch(editBurger(res.data)))
      .catch(console.error.bind(console));

export const deleteBurger = (id) =>
  dispatch =>
    axios.delete(`/api/burgers/${id}`)
      .then(() =>
        dispatch(removeBurger(id)))
      .catch(console.error.bind(console));
/**
 * REDUCER
 */
export default function (state = defaultBurgers, action) {
  switch (action.type) {
    case GET_BURGERS:
      return action.burgers;
    case ADD_BURGER:
      return [...state, action.burger];
    case EDIT_BURGER:
      return state.map(burger => {
        if (burger.id === action.burger.id) {
          return action.burger;
        } else {
          return burger;
        }
      });
    case REMOVE_BURGER:
      return state.filter(burger => burger.id !== action.id);
    default:
      return state;
  }
}
