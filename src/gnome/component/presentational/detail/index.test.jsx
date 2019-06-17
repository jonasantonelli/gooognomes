/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import Detail from './index.jsx';

describe('Detail Component', () => {

  let wrapper;

  const details = {
    age: 240,
    friends: ["Sarabink Tinkbuster", "Tinadette Wrongslicer"],
    hair_color: "Red",
    height: 127.88554,
    id: 3,
    name: "Midwig Gyroslicer",
    professions: ["Carpenter", "Farmer", "Stonecarver", "Brewer", "Tax inspector", "Prospector"],
    thumbnail: "http://www.publicdomainpictures.net/pictures/10000/nahled/1-1275919724d1Oh.jpg",
    weight: 40.97596
  }

  beforeEach(() => {
    wrapper = shallow(<Detail data={details} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain title class', () => {
    expect(wrapper.exists('.detail')).toEqual(true);
  });

});
