import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// import '../../../bootstrap.css';

function DisplayTrips() {
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
    </div>
  );
}

export default DisplayTrips;
