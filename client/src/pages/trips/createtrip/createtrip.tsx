import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { FETCH_TRIPS_QUERY } from '../../../services/queryService';
import { CREATE_TRIP } from '../../../services/mutationService';
import SearchLocationInput from '../../../APIs/googlemaps/searchlocationinput/SearchLocationInput';
import { AuthContext } from '../../../context/auth';
import { useForm } from '../../../util/hooks';
import DestinationPhotos from '../../../APIs/pexels/getphoto/getphoto';
import Daterangepicker from '../../../components/daterangepicker/daterangepicker';

function CreateTrip() {
  let history = useHistory();

  const context = useContext(AuthContext);

  const [errors, setErrors]: any = useState({});
  const [formattedAddress, setFormatedAddress]: any = useState('');
  const [photo, setPhoto]: any = useState('');
  const [dates, setDates]: any = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [ranges, setRanges]: any = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const { onChange, onSubmit, values }: any = useForm(createTripCallback, {
    picture: '',
    expenses: '',
    toDo: '',
    friends: '',
  });

  const [createTrip, { loading }] = useMutation(CREATE_TRIP, {
    variables: {
      destination: formattedAddress,
      fromDate: ranges?.startDate,
      toDate: ranges?.endDate,
      picture: photo,
      // expenses: values.expenses,
      // toDo: values.toDo,
      // friends: values.friends,
    },
    update(proxy: any, result) {
      console.log(proxy);

      if (proxy.data.data.ROOT_QUERY) {
        const data: any = proxy.readQuery({
          query: FETCH_TRIPS_QUERY,
        });
        console.log(data);

        proxy.writeQuery({
          query: FETCH_TRIPS_QUERY,
          data: {
            getTrips: [result.data.createTrip, ...data.getTrips],
          },
        });
      }
      history.push(`/trips/${result.data.createTrip.id}`);
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception.errors);
    },
  });

  console.log(formattedAddress);

  function createTripCallback() {
    createTrip();
  }

  return (
    // <div className="card o-hidden border-0 shadow-lg my-5">
    <div className="card-body p-0">
      <div className="row">
        <div className="col-lg-7">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">
                Ready for your next trip?
              </h1>
            </div>
            <form className="user" onSubmit={onSubmit} noValidate>
              <div className="form-group">
                <SearchLocationInput
                  setFormatedAddress={setFormatedAddress}
                  placeholder={"What's your next destination? ✈"}
                  styles={
                    errors.destination
                      ? 'form-control form-control-user errorRed'
                      : 'form-control form-control-user'
                  }
                />
              </div>
              <div className="form-group">
                <Daterangepicker
                  setDates={setDates}
                  dates={dates}
                  setRanges={setRanges}
                />
              </div>
              <div className="form-group">
                <DestinationPhotos
                  // TODO change destination value to to formattedAddress
                  destination={formattedAddress?.split(',')[0]}
                  setPhoto={setPhoto}
                />
              </div>
              {Object.keys(errors).length > 0 && (
                <div className="">
                  <ul className="">
                    {Object.values(errors).map((value, i) => (
                      <li key={i}> {value}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-user btn-block"
                onClick={onSubmit}
              >
                Create ↪
              </button>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default CreateTrip;
