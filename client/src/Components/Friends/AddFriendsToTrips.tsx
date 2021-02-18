import React, { useContext, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';

import { AuthContext } from '../../Context/Auth';
import { GET_LOGGED_USER } from '../../services/Users/UsersQuery';
import Search from '../../Pages/Search/Search';

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

function AddFriendsToTrips({ selectedFriends, setSelectedFriends }: any) {
  const { user } = useContext<IUser>(AuthContext);
  const [suggestionValue, setSuggestionValue] = useState<string | null>(null);

  useMemo(() => {
    if (suggestionValue !== null) {
      setSelectedFriends((oldFriendsArr: string[]) => {
        if (oldFriendsArr?.indexOf(suggestionValue) === -1) {
          return [...oldFriendsArr, suggestionValue];
        } else return [...oldFriendsArr];
      });
    }
  }, [suggestionValue, setSelectedFriends]);

  const { data: dataLoggedUser } = useQuery(GET_LOGGED_USER, {
    variables: { userId: user.id },
  });

  const loggedUserFriends = dataLoggedUser?.getLoggedUser?.friends;

  return (
    <div className="mb-5">
      {loggedUserFriends?.length > 0 && (
        <div>
          <p className="text-center mt-3">Add friends to the trip</p>
          <Search
            dataToSearch={loggedUserFriends}
            setSuggestionValue={setSuggestionValue}
          />
        </div>
      )}
      <div className="w-100 d-flex mt-3">
        {selectedFriends?.length > 0 &&
          selectedFriends?.map((selectedFriend: string) => {
            return (
              <div className="mx-2">
                <Avatar>{selectedFriend?.charAt(0).toUpperCase()}</Avatar>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AddFriendsToTrips;
