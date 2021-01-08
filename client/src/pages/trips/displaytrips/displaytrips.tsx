import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import PastTrips from '../../../components/pasttrips/pasttrips';
import { AuthContext } from '../../../context/auth';
import { FETCH_TRIPS_BY_USERNAME } from '../../../services/queryService';

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

function DisplayTrips() {
  const { user } = useContext<IUser>(AuthContext);

  const { loading, data } = useQuery(FETCH_TRIPS_BY_USERNAME, {
    variables: { userId: user.id },
    pollInterval: 500,
  });

  const trips = data?.getTripsByUsername;

  return (
    <div>
      <Link to="/createTrip">
        <button className="btn btn-primary btn-icon-split">
          <span className="icon text-white-50">
            <i className="fas fa-flag"></i>
          </span>
          <span className="text">Create trip</span>
        </button>
      </Link>
      {loading ? (
        <div>
          {/* TODO spinner */}
          Loading...
        </div>
      ) : (
        <PastTrips trips={trips} />
      )}
    </div>
  );
}

export default DisplayTrips;
