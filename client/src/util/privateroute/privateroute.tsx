import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import './privateroute.css';

import Sidebar from '../../components/sidebar/sidebar';

function PrivateRoute({ children, ...rest }: any) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          <div className="privateroute">
            <div className="theSidebar">
              <Sidebar />
            </div>
            <div className="topBar"></div>
            <div className="allElements">{children}</div>
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
