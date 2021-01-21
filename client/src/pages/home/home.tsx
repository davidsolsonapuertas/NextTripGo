import React, { useState, useMemo } from 'react';
import SearchLocationInput from '../../APIs/GoogleMaps/SearchLocationInput/SearchLocationInput';
import RandomVideo from '../../APIs/Pexels/RandomVideo/RandomVideo';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import './home.css';
import { styles } from '../../assets/MaterialUIStyles';
import DropZone from '../../Components/ModalCropPic/DropZone';

function Home() {
  const [formattedAddress, setFormattedAddress] = useState('');
  const history = useHistory();

  const classes = styles();

  useMemo(() => {
    if (formattedAddress.length > 1) {
      history.push('/createTrip');
    }
  }, [formattedAddress, history]);

  return (
    <div className="grid-container-home w-100 h-100 mb-3">
      <div className="getstarted d-flex text-center w-100 my-5 flex-column align-items-center justify-content-center">
        <h1>Get started! You don't have trips yet.</h1>
      </div>
      <div className="createtrip">
        <div className="d-flex justify-content-center card shadow shadow-hover ml-4 mr-2 h-100">
          <div className="home-video">
            <RandomVideo />
          </div>
          <div className="video-content text-center">
            <div className="rounded-right overflow-hidden">
              <h2 className="text-home w-75 mb-5">Create a trip now!</h2>
            </div>
            <div className="form-group d-flex justify-content-center">
              <SearchLocationInput
                setFormatedAddress={setFormattedAddress}
                placeholder={"What's your next destination? ✈"}
                styles={'form-control form form-control-user w-50'}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="dropzone">
        <div className="d-flex justify-content-center card shadow shadow-hover mr-4 ml-2 h-100">
          <div className="getstarted d-flex text-center w-100 my-5 flex-column align-items-center justify-content-center">
            <h4 className="text-home">
              Why not upload a profile picture? Drag and drop or click here to
              upload.
            </h4>
          </div>
          <DropZone>
            <div>
              <Avatar
                className={classes.profilePic + ' shadow-hover img userOwnPic'}
              >
                ?
              </Avatar>
            </div>
          </DropZone>
        </div>
      </div>
    </div>
  );
}
export default Home;
