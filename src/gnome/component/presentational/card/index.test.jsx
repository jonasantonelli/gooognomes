/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import Card from './index.jsx';

describe('Card Component', () => {

  let wrapper;

  const props = {
    id: 1,
    thumbnail: 'http://www.publicdomainpictures.net/pictures/10000/nahled/1-1275919724d1Oh.jpg',
    name: 'Test',
    age: 100
  }

  beforeEach(() => {
    wrapper = shallow(<Card {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title class', () => {
    expect(wrapper.exists('.card')).toEqual(true);
  });

});
