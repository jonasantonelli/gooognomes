/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import Search from './index.jsx';

describe('Search Component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Search />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title class', () => {
    expect(wrapper.exists('.search')).toEqual(true);
  });

  it('should contain children example', () => {
    expect(wrapper.exists('input')).toEqual(true);
  });
});
