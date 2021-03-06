import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AdminAccountRoutes from './accounts';

const AdminRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/accounts`} component={AdminAccountRoutes} />
  </Switch>
);

AdminRoutes.propTypes = {
  match: PropTypes.object.isRequired
};

export default AdminRoutes;