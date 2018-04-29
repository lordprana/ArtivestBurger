import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {BurgerForm, AllBurgers, Header} from './components';
import {retrieveBurgers, retrieveToppings} from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    return (
    <div>
      <Header />

      <Switch>
        <Route path="/edit/:id" component={BurgerForm} />
        <Route path="/create" component={BurgerForm} />
        <Route component={AllBurgers} />
    </Switch>
    </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(retrieveBurgers());
      dispatch(retrieveToppings());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
