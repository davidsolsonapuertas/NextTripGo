import React, { useContext } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import './topbar.css';
import { AuthContext } from '../../Context/Auth';

function Topbar({ setSidebar }: any) {
  const { logout } = useContext(AuthContext);

  const showSidebar = () => setSidebar((sidebar: any) => !sidebar);

  return (
    <div className="trip-sidebar bg-white shadow">
      <Link className="trip-sidebar-icon" to="#">
        <NavigateBeforeIcon onClick={showSidebar} />
      </Link>
      <button
        className="button float-right btn"
        style={{ float: 'right' }}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Topbar;
