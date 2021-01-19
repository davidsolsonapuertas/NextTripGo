import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import { styles } from '../../assets/MaterialUIStyles';
import { User } from '../../Interfaces/User';
import { Link } from 'react-router-dom';

interface IProps {
  friends: User[];
  username: User['username'];
}

function ShowFriends({ friends, username }: IProps) {
  const classes = styles();

  return (
    <div className="mt-3 d-flex justify-content-between text-right">
      <div className="m-2 d-flex flex-column">
        <h4 className="mb-3">Created by</h4>
        <Link to={'/user/' + username}>
          <Avatar className={classes[0]}>
            {username?.charAt(0).toUpperCase()}
          </Avatar>
        </Link>
      </div>
      <div className="ml-3 mt-2 d-flex flex-column">
        <h4 className="mr-2 mb-3">Friends</h4>
        <div className="d-flex">
          {friends?.map((friend: User, index: number) => {
            return (
              <div className="mx-2">
                <Link to={'/user/' + friend?.username}>
                  <Avatar className={classes[index + 1]}>
                    {friend?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShowFriends;
