/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import List from './index.jsx';

describe('List Component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<List />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title class', () => {
    expect(wrapper.exists('.list')).toEqual(true);
  });

});
