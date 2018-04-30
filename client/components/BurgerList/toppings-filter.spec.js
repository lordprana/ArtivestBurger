import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ToppingsFilter} from './toppings-filter';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('ToppingsFilter', () => {
  let toppingsFilter;

  beforeEach(() => {
    const toppings = [
      { name: 'cheese' },
      { name: 'tuna' },
      { name: 'eggplant' },
      { name: 'onions' },
      { name: 'avocado' },
      { name: 'tomatos' },
    ];

    toppingsFilter = shallow(<ToppingsFilter toppings={toppings} />);
  });

  it('renders correct number of toppings', () => {
    // Number of toppings plus all topping option is length 7
    expect(toppingsFilter.find('.toppings-filter-container').children())
      .to.have.length(7);
  });
});
