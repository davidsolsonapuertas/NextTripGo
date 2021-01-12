import React, { useState } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

interface IProps {
  item: any;
  key: number;
}

function SubMenu({ item, key }: IProps) {
  const location = useLocation();
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <div>
      {subnav && item.subNav ? (
        <div className="submenu-link" onClick={item.subNav && showSubnav}>
          <div>
            {item.icon}
            <span className="submenu-label">{item.title}</span>
          </div>
          <div className="icons">
            {item.subNav && subnav ? (
              <ArrowDropUpIcon />
            ) : item.subNav ? (
              <ArrowDropDownIcon />
            ) : null}
          </div>
        </div>
      ) : (
        <Link
          to={item.path}
          className="submenu-link"
          onClick={item.subNav && showSubnav}
        >
          <div>
            {item.icon}
            <span className="submenu-label">{item.title}</span>
          </div>
          <div className="icons">
            {item.subNav && subnav ? (
              <ArrowDropUpIcon />
            ) : item.subNav ? (
              <ArrowDropDownIcon />
            ) : null}
          </div>
        </Link>
      )}
      {subnav && item.subNav && (
        <div className="bg-white mx-4 py-2 collapse-inner rounded">
          {item.subNav.map((item: any, index: number) => {
            return (
              <Link
                className="submenu-dropdown-link mx-3"
                to={item.path}
                key={index}
              >
                {item.icon}
                <span className="submenu-label">{item.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SubMenu;
