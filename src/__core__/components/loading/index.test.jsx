/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import Loading from './index.jsx';

describe('Loading Component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title class', () => {
    expect(wrapper.exists('.loading')).toEqual(true);
  });

  it('should contain children example', () => {
    expect(wrapper.exists('svg')).toEqual(true);
  });
});
