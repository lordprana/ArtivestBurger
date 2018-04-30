import React from 'react';
import PropTypes from 'prop-types';

/**
 * COMPONENT
 */

const handleClick = (history) => () => {
  history.push('/');
};

const Header = ({history}) => {

  return (
    <div className="header-container">
      <h1
        className="header-text"
        onClick={handleClick(history)}>
          Burger burger
      </h1>
    </div>
  );
};

export default Header;

/**
 * PROP TYPES
 */
Header.propTypes = {
  history: PropTypes.object
};
