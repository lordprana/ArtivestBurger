import React from 'react';

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
