import React from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { User } from '../../Interfaces/User';

interface IProps {
  loggedUser: User;
}

function FriendRequestDropdown({ loggedUser }: IProps) {
  return (
    <div className="dropdown no-arrow">
      <Dropdown>
        <Link to="/friends">
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            <div className="d-flex">
              <SupervisedUserCircleIcon style={{ fontSize: 45 }} />
              <div className="friend-requests">
                {loggedUser?.receivedFriendRequests?.length > 0 && (
                  <p className="">
                    {loggedUser?.receivedFriendRequests?.length}
                  </p>
                )}
              </div>
            </div>
          </Dropdown.Toggle>
        </Link>
      </Dropdown>
    </div>
  );
}

export default FriendRequestDropdown;
