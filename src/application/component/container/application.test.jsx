/**
 * @jest-environment jsdom
 */
import React from 'react';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import schema from '../../schema';

import AppContainer from './application.jsx';

const mockStore = configureStore([thunk]);

describe('Application Container', () => {

  let store,
      wrapper;

  beforeEach(() => {
    store = mockStore(schema);
    wrapper = shallow(<AppContainer store={store} />).dive();
  });

  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

});
