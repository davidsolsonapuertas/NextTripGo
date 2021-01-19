import React, { useContext, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
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
          <DropZone>
            <Avatar className={classes.profilePic + ' shadow-hover img'}>
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
          </DropZone>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ProfilePicture;
