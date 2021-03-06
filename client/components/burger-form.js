import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postBurger, putBurger} from '../store';


export class BurgerForm extends React.Component {
  constructor (props) {
    super(props);
    this.editBurger = props.burgers.find(burger => burger.id === +props.match.params.id);

    this.state = {
      name: this.editBurger && this.editBurger.name,
      has_bun: this.editBurger && this.editBurger.has_bun,
      has_patty: this.editBurger && this.editBurger.has_patty,
      valid_name: true
    };
    this.props.toppings.forEach(topping => {
      this.state[topping.name] = this.editBurger && this._hasTopping(this.editBurger, topping);
    });

    this._handleCheckboxClick = this._handleCheckboxClick.bind(this);
    this._handleTextInputChange = this._handleTextInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._constructJsonRequestBody = this._constructJsonRequestBody.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.editBurger = nextProps.burgers.find(burger => burger.id === +nextProps.match.params.id);
    let nextState = {
      name: this.editBurger && this.editBurger.name,
      has_bun: this.editBurger && this.editBurger.has_bun,
      has_patty: this.editBurger && this.editBurger.has_patty
    };
    this.props.toppings.forEach(topping => {
      nextState[topping.name] = this.editBurger && this._hasTopping(this.editBurger, topping);
    });
    this.setState(nextState);
  }

  render() {
    let {burgers, toppings, match} = this.props;
    return (
      <div className="form-container">
        <form onSubmit={this._handleSubmit}>
          <div>
            <input
              className="burger-name-input"
              name="name"
              type="text"
              placeholder="Burger name..."
              value={this.state.name}
              onChange={this._handleTextInputChange} />
          </div>
          <div className="burger-checkbox">
            <input
              name="has_bun"
              type="checkbox"
              checked={this.state.has_bun}
              onChange={this._handleCheckboxClick} />
            <label>Has bun</label>
          </div>
          <div className="burger-checkbox">
            <input
              name="has_patty"
              type="checkbox"
              checked={this.state.has_patty}
              onChange={this._handleCheckboxClick} />
            <label>Has patty</label>
          </div>
          {toppings.map(topping => (
            <div key={topping.name} className="burger-checkbox">
              <input
                name={topping.name}
                type="checkbox"
                checked={this.state[topping.name]}
                onChange={this._handleCheckboxClick} />
              <label>{topping.name}</label>
            </div>
          ))}
          <div className="submit-input">
            <input className="btn" type="submit" value="Submit" />
          </div>
          { !this.state.valid_name &&
            <div className="form-validation-error">Burger name cannot be empty</div>}

        </form>
      </div>
    );

  }

  _handleSubmit(e) {
    e.preventDefault();
    let form = e.target;
    let jsonRequestBody = this._constructJsonRequestBody(form);
    console.log(jsonRequestBody);

    if (jsonRequestBody.name === '') {
      this.setState({valid_name: false});
      return;
    }

    // If editBurger is defined, we are editing, else we're creating
    if (this.editBurger) {
      this.props.putBurger(jsonRequestBody)
      .then(() => this.props.history.push('/'));
    }
    else {
      this.props.postBurger(jsonRequestBody)
      .then(() => this.props.history.push('/'));
    }
  }

  _constructJsonRequestBody(form) {
    let jsonRequestBody = {};
    if (this.editBurger) jsonRequestBody.id = this.editBurger.id;
    jsonRequestBody.name = form.elements[0].value;
    jsonRequestBody.has_bun = form.elements[1].checked;
    jsonRequestBody.has_patty = form.elements[2].checked;
    jsonRequestBody.toppings = [];
    for ( let i = 3; i < form.elements.length; i++) {
      let el = form.elements[i];
      if (el.checked) {
        jsonRequestBody.toppings.push({name: el.name});
      }
    }
    return jsonRequestBody;
  }

  _handleCheckboxClick(e) {
    let updateState = {};
    updateState[e.target.name] = e.target.checked;
    console.log(updateState);
    this.setState(updateState);
  }

  _handleTextInputChange(e) {
    let updateState = {};
    updateState[e.target.name] = e.target.value;
    updateState.valid_name = true;
    this.setState(updateState);
  }

  _hasTopping(burger, topping) {
    for (let t of burger.toppings) {
      if (t.name === topping.name) return true;
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

const mapDispatch = {
    postBurger,
    putBurger
};

export default connect(mapState, mapDispatch)(BurgerForm);

/**
 * PROP TYPES
 */
BurgerForm.propTypes = {
  burgers: PropTypes.array,
  toppings: PropTypes.array
};
