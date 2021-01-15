import React, { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Card, Button, Dropdown } from 'react-bootstrap';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/client';

import { DELETE_TRIP } from '../../../services/mutationService';
import Logo from '../../../assets/logo.png';
import Modal from '../../../Containers/Modal/Modal';
import { GET_TRIP_BY_ID } from '../../../services/queryService';
import SeeExpenses from '../../../Components/Expenses/SeeExpenses';
import MapCoordinates from '../../../APIs/googlemaps/MapCoordinates';

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
        <div className="">
          <div className="">
            <div key={trip.id} className="mx-3 card shadow shadow-hover mb-4">
              <Link to={'/trips/' + trip.id}>
                <Card.Img
                  className="img-thumbnail mb-1"
                  src={trip.picture ? trip.picture : Logo}
                />
              </Link>
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  <Link to={'/trips/' + trip.id}>
                    {trip.destination.formattedAddress}
                  </Link>
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
                      <Dropdown.Item href={'#edit' + trip.id}>
                        Edit
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="card-body card-margin">
                {moment(trip.fromDate).format('MMM Do YY')} {' – '}
                {moment(trip.toDate).format('MMM Do YY')}
              </div>
            </div>
            <div className="">
              <MapCoordinates
                latitude={trip.destination.latitude}
                longitude={trip.destination.longitude}
              />
            </div>
          </div>
          <div className="">
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
