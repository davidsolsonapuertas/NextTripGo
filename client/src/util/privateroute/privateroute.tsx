import React, { useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../Context/Auth';
import './privateroute.css';

import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';

function PrivateRoute({ children, ...rest }: any) {
  const { user } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(true);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          <div>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
            <Topbar setSidebar={setSidebar} />
            <div
              className={
                sidebar ? 'other-elements' : 'other-elements-nosidebar'
              }
            >
              {children}
            </div>
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
