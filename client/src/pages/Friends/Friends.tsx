import React, { useContext } from 'react';

import { useQuery } from '@apollo/client';
import FriendCards from '../../Components/FriendCards/FriendCards';
import { AuthContext } from '../../Context/Auth';
import { GET_LOGGED_USER } from '../../services/Users/UsersQuery';

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

function Friends() {
  const { user } = useContext<IUser>(AuthContext);

  const { data: dataLoggedUser } = useQuery(GET_LOGGED_USER, {
    variables: { userId: user?.id },
    pollInterval: 10000,
  });

  const loggedUser = dataLoggedUser?.getLoggedUser;

  return (
    <div>
      <FriendCards
        friends={loggedUser?.friends}
        receivedFriendRequests={loggedUser?.receivedFriendRequests}
      />
    </div>
  );
}

export default Friends;
