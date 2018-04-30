import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {SingleBurger} from './single-burger';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('SingleBurgers', () => {
  let singleBurger;

  it('renders burger1 correctly', () => {
    const burger = {
      name: 'burger1',
      has_bun: true,
      has_patty: true,
      toppings: [
        { name: 'tuna' },
        { name: 'eggplant' }
      ]
    };

    singleBurger = shallow(<SingleBurger burger={burger} />);
    // Number of burgers plus add burger button is length 3
    expect(singleBurger.find('.burger-name').text()).to.equal('burger1');
    expect(singleBurger.find('.burger-item').at(0).text()).to.equal('Bun');
    expect(singleBurger.find('.burger-item').at(1).text()).to.equal('Patty');
    expect(singleBurger.find('.toppings-list').children()).to.have.length(2);
  });

  it('renders burger2 correctly', () => {
    const burger = {
      name: 'burger1',
      has_bun: false,
      has_patty: false,
      toppings: []
    };

    singleBurger = shallow(<SingleBurger burger={burger} />);
    // Number of burgers plus add burger button is length 3
    expect(singleBurger.find('.burger-name').text()).to.equal('burger1');
    expect(singleBurger.find('.burger-item').at(0).text()).to.equal('No bun');
    expect(singleBurger.find('.burger-item').at(1).text()).to.equal('No patty');
    expect(singleBurger.find('.toppings-list').children()).to.have.length(0);
  });
});
