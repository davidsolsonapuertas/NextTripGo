import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Dropdown } from 'react-bootstrap';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/client';

import './tripdetail.css';
import { DELETE_TRIP } from '../../../services/Trips/TripsMutation';
import { GET_TRIP_BY_ID } from '../../../services/Trips/TripsQuery';
import Logo from '../../../assets/logo.png';
import Modal from '../../../Containers/Modal/Modal';
import SeeExpenses from '../../../Components/Expenses/SeeExpenses';
import MapCoordinates from '../../../APIs/GoogleMaps/MapCoordinates';
import ShowFriends from '../../../Components/Friends/ShowFriends';

interface IProps {
  id: string;
}

function TripDetail() {
  let { id } = useParams<IProps>();
  const [showModal, setShowModal] = useState(false);
  let history = useHistory();

  const toggleModal = () => {
    setShowModal((state) => !state);
  };

  let { data } = useQuery(GET_TRIP_BY_ID, {
    variables: { tripId: id },
  });

  const [deleteTrip] = useMutation(DELETE_TRIP, {
    update() {
      history.push('/trips');
      history.go(0);
    },
  });

  let trip = data?.getTrip;

  return (
    <div>
      {trip ? (
        <div className="grid-container-detail">
          <div
            key={trip.id}
            className="Card d-flex justify-content-center card shadow shadow-hover mr-3 mt-5"
          >
            <Card.Img
              className="img-thumbnail w-100 mb-0"
              src={trip.picture ? trip.picture : Logo}
            />
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h1 className="m-0 font-weight-bold text-primary">
                {trip.destination.formattedAddress}
              </h1>
              <div className="dropdown no-arrow">
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <MoreVertIcon />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="right">
                    <Dropdown.Item variant="danger" onClick={toggleModal}>
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item href={'#edit' + trip.id}>Edit</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="card-body card-margin">
              {moment(trip.fromDate).format('MMM Do YY')} {' – '}
              {moment(trip.toDate).format('MMM Do YY')}
              {trip?.friends?.length > 0 && (
                <ShowFriends
                  friends={trip?.friends}
                  username={trip.userid.username}
                />
              )}
            </div>
          </div>
          <div className="Map mt-5 mb-3 mr-5 ml-3">
            <MapCoordinates
              latitude={trip.destination.latitude}
              longitude={trip.destination.longitude}
              style={{ width: '500px', height: '500px' }}
            />
          </div>
          <div className="Expenses mr-3 mb-5">
            {trip.expenses.length > 0 && (
              <SeeExpenses expenses={trip.expenses} />
            )}
          </div>
        </div>
      ) : (
        <p>Loading trip...</p>
      )}
      <Modal
        header="Delete trip"
        acceptButtonStyle="danger"
        acceptButtonText="Delete"
        body="Are you sure you want to delete this trip?"
        show={showModal}
        onCancel={toggleModal}
        onConfirm={async () => {
          await deleteTrip({ variables: { tripId: trip.id } });
          toggleModal();
        }}
      ></Modal>
    </div>
  );
}

export default TripDetail;
