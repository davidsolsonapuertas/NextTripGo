import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import DehazeIcon from '@material-ui/icons/Dehaze';

import './topbar.css';
import { AuthContext } from '../../Context/Auth';
import Search from '../../Pages/Search/Search';

interface IProps {
  setSidebar: Dispatch<SetStateAction<boolean>>;
}

function Topbar({ setSidebar }: IProps) {
  const [open, setOpen] = useState(true);
  const { logout } = useContext(AuthContext);

  const showSidebar = () =>
    setSidebar((sidebar: boolean) => {
      setOpen(!open);
      return !sidebar;
    });

  return (
    <div className="trip-topbar d-flex justify-content-between bg-white shadow">
      <div className="margin-topbar d-flex align-items-center">
        <Link className="trip-sidebar-icon" to="#">
          <DehazeIcon onClick={showSidebar} />
        </Link>
      </div>
      <div className="">
        <Search />
      </div>
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
