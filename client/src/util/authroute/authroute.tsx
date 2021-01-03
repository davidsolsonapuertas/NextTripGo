import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

function AuthRoute({ children, ...rest }: any) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => (user ? <Redirect to="/" /> : children)}
    />
  );
}

export default AuthRoute;