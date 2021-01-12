import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useMutation } from '@apollo/client';

import { DELETE_TRIP } from '../../services/mutationService';
import Logo from '../../assets/logo.png';
import Modal from '../../Containers/Modal/Modal';
import './tripcards.css';

function TripCard({ trip }: any) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((state) => !state);
  };

  const [deleteTrip] = useMutation(DELETE_TRIP);

  return (
    <>
      <div key={trip.id} className="mx-3 card shadow mb-4">
        <Link to={'/trips/' + trip.id}>
          <Card.Img
            className="img-thumbnail mb-1"
            src={trip.picture ? trip.picture : Logo}
          />
        </Link>
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            <Link to={'/trips/' + trip.id}>{trip.destination}</Link>
          </h6>
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
        <div className="card-body">
          {moment(trip.fromDate).format('MMM Do YY')} {' – '}
          {moment(trip.toDate).format('MMM Do YY')}
        </div>
        <Button
          href={'/trips/' + trip.id}
          className="rounded-0"
          variant="primary"
        >
          See trip
        </Button>
      </div>

      <Modal
        header="Delete trip"
        // acceptButtonStyle="danger"
        // acceptButtonText="Delete"
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
