import React, { Dispatch, SetStateAction } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';

import './Sidebar.css';

import SubMenu from './SubMenu';
import { routes } from './SidebarRoutes';

interface IProps {
  sidebar: boolean;
  setSidebar: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ sidebar, setSidebar }: IProps) {
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div
        className={
          sidebar ? 'trip-sidebar-nav shadow' : 'trip-sidebar-nav-closed'
        }
      >
        <div className={sidebar ? 'trip-sidebar-wrap' : 'trip-sidebar-hidden'}>
          <Link className="" to="#">
            <div className={'trip-sidebar-icon'}>
              <NavigateBeforeIcon color={'action'} onClick={showSidebar} />
            </div>
          </Link>
          <img alt="logo" width="90%" src={Logo} />

          {routes.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
