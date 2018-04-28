import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

const updateActiveClass = (node) => {
  let options = [...document.getElementsByClassName('topping-option')];
  options.forEach(option => {
    option.classList.remove('active-topping-option');
  });
  node.classList.add('active-topping-option');
}

const ToppingsFilter = ({toppings, setToppingsFilter}) => {

  return (
    <div className="toppings-filter-container">
      <div
        className="topping-option active-topping-option"
        onClick={(e) => {
          setToppingsFilter(null);
          updateActiveClass(e.target);
        }}>All</div>
      {toppings.map(topping => (
        <div
          key={topping.name}
          className="topping-option"
          onClick={(e) => {
            setToppingsFilter(topping.name);
            updateActiveClass(e.target);
          }}>
            {topping.name}
          </div>
      ))}
    </div>
  )
}

export default ToppingsFilter;

/**
 * PROP TYPES
 */
ToppingsFilter.propTypes = {
  toppings: PropTypes.array,
  setToppingsFilter: PropTypes.func
}
