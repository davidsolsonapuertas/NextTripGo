import React, { useState } from "react";
import { Link } from "react-router-dom";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

interface IProps {
  item: {
    title: string;
    path: string;
    icon: JSX.Element;
    subNav?: {
      title: string;
      path: string;
      icon: JSX.Element | string;
    }[];
  };
}

function SubMenu({ item }: IProps) {
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
        <div className="bg-white mx-4 collapse-inner rounded">
          {item.subNav.map((item, index) => {
            return (
              <Link
                key={index}
                className="submenu-dropdown-link mx-1"
                to={item.path}
              >
                <span className="submenu-label override">{item.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SubMenu;
