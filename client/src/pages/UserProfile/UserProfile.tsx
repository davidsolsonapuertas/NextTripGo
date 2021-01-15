import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';

// TODO remove line and file
import profilepic from '../../assets/profilepic.jpg';
import { AuthContext } from '../../Context/Auth';
import { FETCH_TRIPS_BY_USERNAME } from '../../services/queryService';
import './userprofile.css';
import UserTripcards from '../../Components/TripCards/TripCards';
import MapCoordinates from '../../APIs/GoogleMaps/MapCoordinates';

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
  const { user } = useContext<IUser>(AuthContext);
  let { data } = useQuery(FETCH_TRIPS_BY_USERNAME, {
    variables: { userId: user.id },
  });

  let trips = data?.getTripsByUsername;

  return (
    <div className="grid-container">
      <div className="trips">
        <h3 className="profile-trips-text">David's trips</h3>
        <UserTripcards trips={trips} time="upcoming" mode="Users" />
      </div>
      <div className="profile-pic ">
        <img
          className="profilepic shadow-hover"
          alt={'username'}
          src={profilepic}
        />
        <h1 className="profile-username-text">David</h1>
      </div>
      <div className="Information shadow-hover">
        <LocationOnIcon color="error" />
        <p>&nbsp; Barcelona | &nbsp;</p> <p>&nbsp;🎂&nbsp; 22 y.o. | &nbsp;</p>
        <PeopleIcon />
        <p>&nbsp;&nbsp; 22 friends | &nbsp;</p> <p>22 yo&nbsp;</p>
        <p>Barcelona&nbsp;</p> <p>22 yo</p>
      </div>
      <div className="Stat1">
        <MapCoordinates
          latitude="41.390205"
          longitude="2.154007"
          style={{ minWidth: '340px', height: '200px' }}
        />
      </div>
      <div className="Button">
        <button className="btn btn-primary profile-button w-75 h-50">
          Send friend request
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
