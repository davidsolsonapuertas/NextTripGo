import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import moment from 'moment';

import { GET_LOGGED_USER } from '../../services/Users/UsersQuery';
import MapCoordinates from '../../APIs/GoogleMaps/MapCoordinates';
import { AuthContext } from '../../Context/Auth';
import UserTripcards from '../../Components/TripCards/TripCards';
import ProfilePicture from '../../Components/UserProfileActions/ProfilePicture';

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

function Profile() {
  const { user } = useContext<IUser>(AuthContext);

  const { data: dataLoggedUser } = useQuery(GET_LOGGED_USER, {
    variables: { userId: user.id },
    // pollInterval: 1000,
  });
  let loggedUser = dataLoggedUser?.getLoggedUser;
  return (
    <div>
      <div className="grid-container">
        <div className="trips">
          <h3 className="profile-trips-text">Your trips</h3>
          {loggedUser?.trips.length > 0 ? (
            <UserTripcards trips={loggedUser?.trips} time="" mode="Users" />
          ) : (
            <div>
              <p>You don't have any trips.</p>
              <Link to="/createTrip">
                <button className="btn btn-primary btn-icon-split">
                  <span className="icon text-white-50">
                    <FlightTakeoffRoundedIcon />
                  </span>
                  <span className="text">Create trip</span>
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="profile-pic d-flex flex-column justify-content-center">
          <div className="mx-25">
            <ProfilePicture user={loggedUser} />
          </div>
          <h1 className="profile-username-text">{loggedUser?.username}</h1>
        </div>
        <div className="Information shadow-hover">
          <LocationOnIcon color="error" />
          <p>
            &nbsp;
            {loggedUser?.currentCity?.formattedAddress &&
              loggedUser?.currentCity?.formattedAddress}
            &nbsp; &nbsp; | &nbsp;&nbsp;
          </p>
          <PeopleIcon />
          <p>
            &nbsp;&nbsp;
            {loggedUser?.friends?.length > 0
              ? loggedUser?.friends.length + ' friends'
              : 'No friends yet'}
            &nbsp;&nbsp; | &nbsp;&nbsp;
          </p>
          {' 🌏 '}&nbsp;
          <p>
            {loggedUser?.trips?.length > 0
              ? loggedUser?.trips.length + ' trips'
              : 'No trips yet'}
            &nbsp; &nbsp; | &nbsp;&nbsp;
          </p>
          {' 🗓 '}&nbsp;
          <p>
            {'Joined ' + moment(loggedUser?.createdAt, 'YYYYMMDD').fromNow()}
            &nbsp;
          </p>
        </div>
        {loggedUser?.currentCity?.latitude ? (
          <div className="Stat1">
            <MapCoordinates
              latitude={loggedUser?.currentCity.latitude}
              longitude={loggedUser?.currentCity.longitude}
              style={{ minWidth: '340px', height: '200px' }}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Profile;
