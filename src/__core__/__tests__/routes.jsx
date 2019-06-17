/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';

import { RoutesComponent } from '../routes.jsx';

describe('Router.jsx component', () => {

  const initialLocation = {
    hash: '',
    pathname: '/list',
    search: '',
    state: undefined
  }

  const wrapper = shallow(<RoutesComponent location={initialLocation} />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
