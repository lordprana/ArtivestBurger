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
const getBurgers = () => ({type: GET_BURGERS});

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err));

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data));
        history.push('/home');
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}));
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser());
        history.push('/login');
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
