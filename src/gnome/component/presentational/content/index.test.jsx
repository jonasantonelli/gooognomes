/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import Content from './index.jsx';

describe('Content Component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Content />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title class', () => {
    expect(wrapper.exists('.gnome__content')).toEqual(true);
  });

});
