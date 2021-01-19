import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';

import { styles } from '../../assets/MaterialUIStyles';
import { AuthContext } from '../../Context/Auth';
import { User } from '../../Interfaces/User';
import DropZone from '../ModalCropPic/DropZone';

interface IUser {
  user: any;
  login: (userData: LoggedUser) => void;
  logout: () => void;
}

interface LoggedUser {
  username: string;
  password: string;
  token: string;
}

interface IProps {
  user: User;
}

function ProfilePicture({ user }: IProps) {
  const { user: userLoggedIn } = useContext<IUser>(AuthContext);

  const classes = styles();

  return (
    <div>
      {user?.username === userLoggedIn?.username ? (
        <div>
          {user?.profilePic?.length > 1 ? (
            <div
              id="userOwnPic"
              className="profilepic userOwnPic img shadow-hover"
            >
              <DropZone>
                <img
                  width="300px"
                  alt={user?.username}
                  src={user?.profilePic}
                />
              </DropZone>
            </div>
          ) : (
            <div>
              <DropZone>
                <Avatar className={classes.profilePic + ' shadow-hover img'}>
                  {user?.username?.charAt(0).toUpperCase()}
                </Avatar>
              </DropZone>
            </div>
          )}
        </div>
      ) : (
        <div>
          {user?.profilePic?.length > 1 ? (
            <div>
              <div className="profilepic shadow-hover img">
                <img
                  width="300px"
                  alt={user?.username}
                  src={user?.profilePic}
                />
              </div>
            </div>
          ) : (
            <div>
              <Avatar className={classes.profilePic + ' shadow-hover img'}>
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePicture;
