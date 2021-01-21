import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import { styles } from '../../assets/MaterialUIStyles';
import { User } from '../../Interfaces/User';

interface IProps {
  loggedUser: User;
}

function UserProfile({ loggedUser }: IProps) {
  const classes = styles();

  return (
    <div className="mr-4">
      <Link to="/me">
        {loggedUser?.profilePic?.length > 0 ? (
          <Avatar alt={loggedUser?.username} src={loggedUser?.profilePic} />
        ) : (
          <Avatar className={classes.sidebar}>
            {loggedUser?.username?.charAt(0).toUpperCase()}
          </Avatar>
        )}
      </Link>
    </div>
  );
}

export default UserProfile;
