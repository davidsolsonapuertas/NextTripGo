import React, { useState } from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useMutation } from '@apollo/client';

import { Trip } from '../../../Interfaces/Trip';
import { DELETE_TRIP } from '../../../services/mutationService';
import Logo from '../../../assets/logo.png';
import Modal from '../../../Containers/Modal/Modal';
import './../tripcards.css';

interface IProps {
  trip: Trip;
}

function TripCard({ trip }: IProps) {
  const [showModal, setShowModal] = useState(false);
  let history = useHistory();

  const toggleModal = () => {
    setShowModal((state) => !state);
  };

  const [deleteTrip] = useMutation(DELETE_TRIP, {
    update() {
      history.go(0);
    },
  });

  return (
    <>
      <div
        key={trip.id}
        className="mx-3 trip-user card shadow shadow-hover mb-4"
      >
        <Card.Img
          className="img-thumbnail mb-1"
          src={trip.picture ? trip.picture : Logo}
        />
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            {trip.destination.formattedAddress}
          </h6>
        </div>
        <div className="card-body card-margin">
          {moment(trip.fromDate).format('MMM Do YY')} {' – '}
          {moment(trip.toDate).format('MMM Do YY')}
        </div>
      </div>

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
    </>
  );
}

export default TripCard;
