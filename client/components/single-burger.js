import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteBurger} from '../store';

/**
 * COMPONENT
 */

const renderToppings = (burger) => {
  if (burger.toppings.length === 0) return null;
  return (
    <div>
      <div>Toppings</div>
      <ul className="toppings-list">
        {burger.toppings.map(topping => (
          <li key={topping.name}>{topping.name}</li>
        ))}
      </ul>
    </div>
  );
};

const handleEditClick = (id, history) => () => {
  history.push(`/edit/${id}`);
};

const handleDeleteClick = (id, deleteFunc) => () => {
  deleteFunc(id);
};

const SingleBurger = ({burger, history, deleteBurger}) => {

  return (
    <div className="single-burger-container">
      <div className="burger-items-container">
        <div className="burger-name">{burger.name}</div>
        <div className="burger-item">{burger.has_bun ? 'Bun' : 'No bun'}</div>
        <div className="burger-item">{burger.has_patty ? 'Patty' : 'No patty'}</div>
        <div className="burger-item">{renderToppings(burger)}</div>
      </div>
      <div className="burger-buttons">
        <button
          className="btn"
          onClick={handleEditClick(burger.id, history)}>
          Edit
        </button>
        <button
          className="btn"
          onClick={handleDeleteClick(burger.id, deleteBurger)}>
          Delete
        </button>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapDispatch = {
  deleteBurger
};

export default connect(null, mapDispatch)(SingleBurger);

/**
 * PROP TYPES
 */
SingleBurger.propTypes = {
  burger: PropTypes.object
};
