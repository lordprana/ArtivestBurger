import React from 'react'
import PropTypes from 'prop-types'

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
  )
}

const SingleBurger = ({burger}) => {

  return (
    <div className="single-burger-container">
      <div className="burger-items-container">
        <div className="burger-name">{burger.name}</div>
        <div className="burger-item">{burger.has_bun ? 'Bun' : 'No bun'}</div>
        <div className="burger-item">{burger.has_patty ? 'Patty' : 'No patty'}</div>
        <div className="burger-item">{renderToppings(burger)}</div>
      </div>
      <div className="burger-buttons">
        <button className="btn">Edit</button>
        <button className="btn">Delete</button>
      </div>
    </div>
  )
}

export default SingleBurger;

/**
 * PROP TYPES
 */
SingleBurger.propTypes = {
  burger: PropTypes.object
}
