/**
 * @jest-environment jsdom
 */
import React from 'react';
import thunk from 'redux-thunk';

import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Detail, { mapStateToProps } from './index.jsx';

const mockStore = configureStore([thunk]);

describe('Detail Container', () => {

  let store,
      wrapperShallow,
      initialState;

  beforeEach(() => {
    initialState = {
      gnome: {
        isFetching: false,
        isError: false,
        details: {
          age: 288,
          friends: [],
          hair_color: "Green",
          height: 110.43628,
          id: 1,
          name: "Fizkin Voidbuster",
          professions: ["Brewer", "Medic", "Prospector", "Gemcutter", "Mason", "Tailor"],
          thumbnail: "http://www.publicdomainpictures.net/pictures/120000/nahled/white-hen.jpg",
          weight: 35.279167
        }
      }
    };

    store = mockStore(initialState);
    wrapperShallow = shallow(<Detail store={store} />).dive()
  });

  it('match snapshot', () => {
    expect(wrapperShallow).toMatchSnapshot();
  });

  it('should be props value', () => {
    const mapped = mapStateToProps(initialState);
    expect(mapped.details.age).toEqual(288);
  });


  it('should exist', () => {
    expect(wrapperShallow.exists()).toBe(true);
  });

});
