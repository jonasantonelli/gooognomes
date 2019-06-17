/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import App from './application.jsx';

describe('Application Component', () => {

  let children,
      wrapper;

  beforeEach(() => {
    children = <div className="example" />
    wrapper = shallow(<App>{ children }</App>);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


  it('should contain children', () => {
    expect(wrapper.exists('.example')).toEqual(true);
  });

});
