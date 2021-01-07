import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../../context/auth';
import { FETCH_TRIPS_QUERY } from '../../services/queryService';

function AuthRoute({ children, ...rest }: any) {
  const { user } = useContext(AuthContext);
  const { loading, data: { getTrips: trips } = {} } = useQuery(
    FETCH_TRIPS_QUERY
  );

  return (
    <Route
      {...rest}
      render={({ location }) => (user ? <Redirect to="/" /> : children)}
    />
  );
}

export default AuthRoute;
