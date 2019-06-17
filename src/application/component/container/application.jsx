import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../presentational/application.jsx';
import Routes from '../../../__core__/routes.jsx';

const Application = () => (
    <App>
      <Routes />
    </App>
);

export default withRouter(connect(null, null)(Application));
