import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {UserHome} from './components';
import {retrieveBurgers} from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {
    return (
    <div>Hello World
      {/*}
      <Switch>
        {/* Routes placed here are available to all visitors}
        { /* <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />  }
        {/* Displays our Login component as a fallback }
        <Route component={UserHome} />
    </Switch> */}
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
