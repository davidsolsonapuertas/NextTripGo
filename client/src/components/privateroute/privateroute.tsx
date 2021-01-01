import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import Sidebar from '../../components/sidebar/sidebar';

function PrivateRoute({ children, ...rest }: any) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          <div>
            <div className="sidebar">
              <Sidebar />
            </div>
            {children}
          </div>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
