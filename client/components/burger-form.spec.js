import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerForm} from './burger-form';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('BurgerForm', () => {
  let burgerForm;

  beforeEach(() => {
    const toppings = [
      { name: 'cheese' },
      { name: 'tuna' },
      { name: 'eggplant' },
      { name: 'onions' },
      { name: 'avocado' },
      { name: 'tomatos' },
    ];

    burgerForm = shallow(<BurgerForm toppings={toppings} burgers={[]} />);
  });

  it('renders correct number of toppings', () => {
    // Number of toppings plus all bun and patty has length 8
    expect(burgerForm.find('.burger-checkbox')).to.have.length(8);
  });

  it('renders no default values if no url param provided', () => {
    expect(burgerForm.state().name).to.equal(undefined);
  });

  it('renders default values if url param provided', () => {
    const toppings = [
      { name: 'cheese' },
      { name: 'tuna' },
      { name: 'eggplant' },
      { name: 'onions' },
      { name: 'avocado' },
      { name: 'tomatos' },
    ];

    const burgers = [{
      name: 'burger1',
      id: 1,
      toppings: []
    }];

    const match = {
      params: {
        id: 1
      }
    };

    burgerForm = shallow(<BurgerForm toppings={toppings} burgers={burgers} match={match} />);
    expect(burgerForm.state().name).to.equal('burger1');
  });
});
