import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';

import './sidebar.css';

import { AuthContext } from '../../context/auth';

const useStyles = makeStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  selected: {
    color: 'white',
  },
});

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const routes = [
    {
      title: 'Home',
      path: '/',
      icon: <HomeRoundedIcon />,
      cName: 'nav-home',
    },
    {
      title: 'Me',
      path: '/me',
      icon: <PersonRoundedIcon />,
      cName: 'nav-profile',
    },
    {
      title: 'Trips',
      path: '/trips',
      icon: <FlightTakeoffRoundedIcon />,
      cName: 'nav-trips',
    },
    {
      title: 'Logout',
      path: '/',
      onClick: logout,
    },
  ];

  const classes: any = useStyles();

  return (
    <div className="navbar bg-gradient-primary">
      <span className="logo">Logo</span>
      {routes.map((item) => {
        return (
          <div className="route" key={item.title} onClick={item.onClick}>
            <Link to={item.path}>
              <span
                className={
                  location.pathname === item.path
                    ? classes.selected
                    : classes.root
                }
              >
                {item.icon}
              </span>
              <span
                className={
                  location.pathname === item.path ? 'divname active' : 'divname'
                }
              >
                {item.title}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
