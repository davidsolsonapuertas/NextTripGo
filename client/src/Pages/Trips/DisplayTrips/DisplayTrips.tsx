import React, { useContext } from "react";
import { Redirect, useLocation, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Card, Nav } from "react-bootstrap";
import FlightTakeoffRoundedIcon from "@material-ui/icons/FlightTakeoffRounded";

import TripCards from "../../../Components/TripCards/TripCards";
import { AuthContext } from "../../../Context/Auth";
import { FETCH_TRIPS_BY_USERNAME } from "../../../services/Trips/TripsQuery";
import { IUser } from "../../../Interfaces/User";

function DisplayTrips() {
  const { user } = useContext<IUser>(AuthContext);
  let { pathname, hash } = useLocation<string>();

  let { data } = useQuery(FETCH_TRIPS_BY_USERNAME, {
    variables: { userId: user?.id },
  });

  let trips = data?.getTripsByUsername;

  return (
    <div>
      {pathname === "/trips" && <Redirect to="/trips#upcoming" />}
      <Card className="rounded-0">
        <Card.Header className="d-flex">
          <Nav variant="tabs" defaultActiveKey="#upcoming">
            <Nav.Item>
              <Nav.Link href="#upcoming">Upcoming</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#past">Past</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
      </Card>

      {trips?.length > 0 ? (
        hash === "#past" ? (
          <TripCards trips={trips} time={"past"} mode="My" />
        ) : (
          <TripCards trips={trips} time={"upcoming"} mode="My" />
        )
      ) : (
        <div className="d-flex w-100 mt-5 flex-column align-items-center justify-content-center">
          <p className="mb-5">You don't have any trips.</p>
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
  );
}

export default DisplayTrips;
