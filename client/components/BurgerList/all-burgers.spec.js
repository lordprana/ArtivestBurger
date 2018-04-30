import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AllBurgers} from './all-burgers';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('AllBurgers', () => {
  let allBurgers;

  beforeEach(() => {
    const burgers = [
      {
        name: 'burger1',
        toppings: [
          { name: 'tuna' },
          { name: 'eggplant' }
        ]
      },
      {
        name: 'burger2',
        toppings: [
          { name: 'cheese' },
        ]
      },
    ];

    allBurgers = shallow(<AllBurgers burgers={burgers} />);
  });

  it('renders all burgers', () => {
    // Number of burgers plus add burger button is length 3
    expect(allBurgers.find('.all-burgers-container').children()).to.have.length(3);
  });

  it('renders filtered burgers', () => {
    // Number of cheese burgers plus add burger button is length 2
    allBurgers.setState({toppingFilter: 'cheese'});
    expect(allBurgers.find('.all-burgers-container').children()).to.have.length(2);
  });

  it('renders ToppingsFilter', () => {
    expect(allBurgers.find('ToppingsFilter')).to.have.length(1);
  });
});
