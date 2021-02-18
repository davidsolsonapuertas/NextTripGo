import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import moment from 'moment';

import './userprofile.css';
import {
  GET_LOGGED_USER,
  GET_USER_BY_USERNAME,
} from '../../services/Users/UsersQuery';
import ProfilePicture from '../../Components/UserProfileActions/ProfilePicture';
import { AuthContext } from '../../Context/Auth';
import Profile from '../../Pages/Profile/Profile';
import UserTripcards from '../../Components/TripCards/TripCards';
import MapCoordinates from '../../APIs/GoogleMaps/MapCoordinates';
import UserProfileFriendButton from '../../Components/UserProfileActions/UserProfileFriendButton';

interface IProps {
  id: string;
}

interface IUser {
  user: any;
  login: (userData: User) => void;
  logout: () => void;
}

interface User {
  username: string;
  password: string;
  token: string;
}

function UserProfile() {
  let { id } = useParams<IProps>();
  const { user } = useContext<IUser>(AuthContext);

  const { data: dataUserVisited } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username: id },
    pollInterval: 500,
  });

  const { data: dataLoggedUser } = useQuery(GET_LOGGED_USER, {
    variables: { userId: user.id },
  });

  let userVisited = dataUserVisited?.getUser;
  let userVisiting = dataLoggedUser?.getLoggedUser;

  return (
    <div>
      {userVisited?.username !== userVisiting?.username ? (
        <div className="grid-container">
          <div className="trips">
            <h3 className="profile-trips-text">
              {userVisited?.firstname}'s trips
            </h3>
            {userVisited?.trips.length > 0 ? (
              <UserTripcards trips={userVisited?.trips} time="" mode="Users" />
            ) : (
              <p>This user has no trips</p>
            )}
          </div>
          <div className="profile-pic ">
            <div className="mx-25">
              <ProfilePicture user={userVisited} />
            </div>
            <h1 className="profile-username-text">{userVisited?.username}</h1>
          </div>
          <div className="Information shadow-hover">
            <LocationOnIcon color="error" />
            <p>
              &nbsp;
              {userVisited?.currentCity?.formattedAddress &&
                userVisited?.currentCity?.formattedAddress}
              &nbsp; &nbsp; | &nbsp;&nbsp;
            </p>
            <PeopleIcon />
            <p>
              &nbsp;&nbsp;
              {userVisited?.friends?.length > 0
                ? userVisited?.friends.length + ' friends'
                : 'No friends yet'}
              &nbsp;&nbsp; | &nbsp;&nbsp;
            </p>
            {' 🌏 '}&nbsp;
            <p>
              {userVisited?.trips?.length > 0
                ? userVisited?.trips.length + ' trips'
                : 'No trips yet'}
              &nbsp; &nbsp; | &nbsp;&nbsp;
            </p>
            {' 🗓 '}&nbsp;
            <p>
              {'Joined ' + moment(userVisited?.createdAt, 'YYYYMMDD').fromNow()}
              &nbsp;
            </p>
          </div>
          {userVisited?.currentCity?.latitude ? (
            <div className="Stat1">
              <MapCoordinates
                latitude={userVisited?.currentCity.latitude}
                longitude={userVisited?.currentCity.longitude}
                style={{ minWidth: '340px', height: '200px' }}
              />
            </div>
          ) : (
            ''
          )}
          <UserProfileFriendButton
            userVisited={userVisited}
            userVisiting={userVisiting}
          />
        </div>
      ) : (
        <div>
          <Profile />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
