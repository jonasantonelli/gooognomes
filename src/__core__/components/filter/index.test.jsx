/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import Filter from './index.jsx';

describe('Loadin Component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Filter />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title class', () => {
    expect(wrapper.exists('.filter')).toEqual(true);
  });

});
