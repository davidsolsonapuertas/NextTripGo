import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { CREATE_TRIP } from "../../../services/Trips/TripsMutation";
import SearchLocationInput from "../../../APIs/GoogleMaps/SearchLocationInput/SearchLocationInput.js";
import DestinationPhotos from "../../../APIs/Pexels/GetPhoto/GetPhoto";
import Daterangepicker from "../../../Components/DateRangePicker/DateRangePicker";
import ExpensesComponent from "../../../Components/Expenses/CreateExpenses";
import AddFriendsToTrips from "../../../Components/Friends/AddFriendsToTrips";
import { Expense } from "../../../Interfaces/Trip";

interface IErrors {
  expensestype?: string;
  destination?: {
    formattedAddress: string[];
    latitude: string[];
    longitude: string[];
  };
}

interface IRanges {
  startDate?: Date;
  endDate?: Date;
}

function CreateTrip() {
  let history = useHistory();

  const [errors, setErrors] = useState<IErrors>({});

  const [formattedAddress, setFormatedAddress] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [photo, setPhoto] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [dates, setDates] = useState<object>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [ranges, setRanges] = useState<IRanges>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createTrip();
  };

  const [createTrip] = useMutation(CREATE_TRIP, {
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
      friends: friends,
      // toDo: values.toDo,
    },
    update(proxy, result) {
      history.push(`/trips/${result.data.createTrip.id}`);
      history.go(0);
    },
    onError(err) {
      setErrors((errors: object) => {
        return err?.graphQLErrors[0]?.extensions?.exception.errors;
      });
    },
  });

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
                ? "form-control form-control-user errorRed w-50"
                : "form-control form-control-user w-50"
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
            destination={formattedAddress[0]?.split(",")[0]}
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
        <div className="form-group d-flex justify-content-center">
          <AddFriendsToTrips
            setSelectedFriends={setFriends}
            selectedFriends={friends}
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
