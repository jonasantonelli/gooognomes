/**
 * @jest-environment jsdom
 */
import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ListContainer, { mapStateToProps } from './index.jsx';

const mockStore = configureStore([thunk]);

describe('List Container', () => {

  let store,
      wrapperShallow,
      initialState;

  beforeEach(() => {
    initialState = {
      gnome: {
        list: [{
          id: 1,
          name: 'test',
          hair_color: 'Pink',
          height: 106,
          friends: ['test1', 'test2'],
          thumbnail: 'url...',
          weight: 39
        }],
        search: [],
        filter: {
          professions: [{name: 'test', checked: false}],
          minAge: 30,
          maxAge: 379,
          range: {
            min: 30,
            max: 379
          }
        }
      }
    };

    store = mockStore(initialState);
    wrapperShallow = shallow(<ListContainer store={store} />).dive();
  });

  it('match snapshot', () => {
    expect(wrapperShallow).toMatchSnapshot();
  });

  it('should be props value', () => {
    const mapped = mapStateToProps(initialState);
    expect(mapped.minAge).toEqual(30);
  });


  it('should exist', () => {
    expect(wrapperShallow.exists()).toBe(true);
  });

});
