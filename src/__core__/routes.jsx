import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from './components/loading/index.jsx';

const GnomeList = Loadable({
    loader: () => import(/* webpackChunkName: "list" */'../gnome/component/container/list/index.jsx'),
    loading: Loading
});

const GnomeDetails = Loadable({
    loader: () => import(/* webpackChunkName: "details" */'../gnome/component/container/details/index.jsx'),
    loading: Loading
});

export const RoutesComponent = ({location}) => (
  <Switch location={location} key="page-switch">
    <Route exact path="/" component={() => <Redirect to={{pathname: "/list"}}/>} />
    <Route exact path="/#" component={() => <Redirect to={{pathname: "/list"}}/>} />
    <Route key="gnomes-list" path="/list" component={GnomeList} />
    <Route key="gnomes-details" path="/details/:id" component={GnomeDetails} />
  </Switch>
);

const Routes = () => (
  <Route
    render={({location}) => <RoutesComponent location={location} />}
  />
);

export default Routes;
