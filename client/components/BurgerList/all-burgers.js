import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SingleBurger from './single-burger';
import ToppingsFilter from './toppings-filter';

/**
 * COMPONENT
 */
export class AllBurgers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toppingFilter: null
    };

    this._setToppingsFilter = this._setToppingsFilter.bind(this);
    this._handleAddBurgerClick = this._handleAddBurgerClick.bind(this);
  }

  render() {
    let filteredBurgers = this.state.toppingFilter ?
                            this.props.burgers.filter(
                              burger => this._containsTopping(
                                burger, this.state.toppingFilter)) :
                            this.props.burgers;
    filteredBurgers.sort((a, b) => b.id - a.id);
    return (
      <div>
        <ToppingsFilter
          toppings={this.props.toppings}
          setToppingsFilter={this._setToppingsFilter} />
        <div className="all-burgers-container">
          {filteredBurgers.map(burger => (
            <SingleBurger
              key={burger.id}
              burger={burger}
              history={this.props.history} />
          ))}
          <div
            className="single-burger-container add-burger-button"
            onClick={this._handleAddBurgerClick}>
            +
          </div>
        </div>
      </div>
    );
  }

  _setToppingsFilter(topping) {
    this.setState({toppingFilter: topping});
  }

  _handleAddBurgerClick() {
    this.props.history.push('/create');
  }

  _containsTopping(burger, filter) {
    for (let topping of burger.toppings) {
      if (topping.name === filter) return true;
    }
    return false;
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    burgers: state.burgers,
    toppings: state.toppings
  };
};

export default connect(mapState)(AllBurgers);

/**
 * PROP TYPES
 */
AllBurgers.propTypes = {
  burgers: PropTypes.array,
  toppings: PropTypes.array
};
