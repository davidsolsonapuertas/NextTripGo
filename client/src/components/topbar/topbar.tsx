import React, { useContext, Dispatch, SetStateAction } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import DehazeIcon from '@material-ui/icons/Dehaze';

import './topbar.css';
import { AuthContext } from '../../Context/Auth';

interface IProps {
  setSidebar: Dispatch<SetStateAction<boolean>>;
}

function Topbar({ setSidebar }: IProps) {
  const { logout } = useContext(AuthContext);

  const showSidebar = () => setSidebar((sidebar: boolean) => !sidebar);

  return (
    <div className="trip-sidebar bg-white shadow">
      <Link className="trip-sidebar-icon" to="#">
        <DehazeIcon onClick={showSidebar} />
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
