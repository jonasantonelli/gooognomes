import 'core-js';
import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Application from './application/component/container/application.jsx';
import store from './__core__/store';


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Application />
    </HashRouter>
  </Provider>
, document.getElementById('webapp-render'));
