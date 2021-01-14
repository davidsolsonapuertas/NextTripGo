import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { FETCH_TRIPS_BY_USERNAME } from '../../../services/queryService';
import { GET_TRIP_BY_ID } from '../../../services/queryService';
import { CREATE_TRIP } from '../../../services/mutationService';
import { AuthContext } from '../../../Context/Auth';
import { useForm } from '../../../util/Hooks';
import SearchLocationInput from '../../../APIs/googlemaps/searchlocationinput/SearchLocationInput.js';
import DestinationPhotos from '../../../APIs/pexels/getphoto/getphoto';
import Daterangepicker from '../../../Components/DateRangePicker/DateRangePicker';
import ExpensesComponent from '../../../Components/Expenses/CreateExpenses';

function CreateTrip() {
  let history = useHistory();

  const { user }: any = useContext(AuthContext);

  const [errors, setErrors]: any = useState({});

  const [formattedAddress, setFormatedAddress]: any = useState('');
  const [photo, setPhoto]: any = useState('');
  const [expenses, setExpenses]: any = useState([]);

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
    destination: '',
    toDo: '',
    friends: '',
  });
  console.log(formattedAddress);

  const [createTrip, { loading }] = useMutation(CREATE_TRIP, {
    variables: {
      destination: {
        formattedAddress: formattedAddress[0],
        latitude: formattedAddress[1],
        longitude: formattedAddress[2],
      },
      fromDate: ranges?.startDate,
      toDate: ranges?.endDate,
      picture: photo,
      expenses: expenses,
      // toDo: values.toDo,
      // friends: values.friends,
    },
    // refetchQueries: (result) => [
    //   { query: FETCH_TRIPS_BY_USERNAME, variables: { userId: user.username } },
    //   { query: GET_TRIP_BY_ID, variables: { tripId: user.username } },
    // ],

    // const data: any = proxy.readQuery({
    //   query: FETCH_TRIPS_BY_USERNAME,
    //   variables: {
    //     userId: user.id,
    //   },
    // });
    // console.log('data', data);
    // console.log('result', result.data);

    // proxy.writeQuery({
    //   query: FETCH_TRIPS_BY_USERNAME,
    //   variables: {
    //     userId: user.id,
    //   },
    //   data: {
    //     getTripsByUsername: [
    //       result.data.createTrip,
    //       ...data.getTripsByUsername,
    //     ],
    //   },
    // });
    update(proxy: any, result) {
      history.push(`/trips/${result.data.createTrip.id}`);
      history.go(0);
    },
    onError(err) {
      setErrors((errors: any) => {
        return err?.graphQLErrors[0]?.extensions?.exception.errors;
      });
    },
  });

  function createTripCallback() {
    createTrip();
  }

  return (
    <div className="p-5 d-flex justify-content-center flex-column flex-wrap">
      <div className="text-center">
        <h1 className="h4 text-gray-900 mb-4">Ready for your next trip?</h1>
      </div>
      <form className="user" onSubmit={onSubmit} noValidate>
        <div className="form-group d-flex justify-content-center">
          <SearchLocationInput
            setFormatedAddress={setFormatedAddress}
            placeholder={"What's your next destination? ✈"}
            styles={
              errors.destination
                ? 'form-control form-control-user errorRed w-50'
                : 'form-control form-control-user w-50'
            }
          />
        </div>
        <div className="form-group mt-3 d-flex justify-content-center">
          <Daterangepicker
            setDates={setDates}
            dates={dates}
            setRanges={setRanges}
          />
        </div>
        <div className="form-group">
          <DestinationPhotos
            destination={formattedAddress[0]?.split(',')[0]}
            setPhoto={setPhoto}
          />
        </div>
        <div className="form-group d-flex justify-content-center">
          <ExpensesComponent
            expenses={expenses}
            setExpenses={setExpenses}
            errors={errors}
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
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn button btn-primary w-50 btn-user btn-block"
            onClick={onSubmit}
          >
            Create ↪
          </button>
        </div>
      </form>
      <hr />
    </div>
  );
}

export default CreateTrip;
