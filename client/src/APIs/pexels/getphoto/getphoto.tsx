import React, { useState, Dispatch, SetStateAction, useMemo } from 'react';
import axios from 'axios';

import '../pexels.css';
import { PexelKey } from '../../../config';
import './getphoto.css';

// TODO Delete
const mockdata = require('./mockdata.js');

type AppProps = {
  destination: string;
  setPhoto: Dispatch<SetStateAction<string>>;
};

function DestinationPhotos({ destination, setPhoto }: AppProps) {
  const [photos, setPhotos]: any = useState({});

  const getPhotos = async (destination: string) => {
    try {
      if (destination.length > 1) {
        const data = await axios.get(
          `https://api.pexels.com/v1/search?query=${destination}&orientation=landscape&per_page=9`,
          {
            headers: {
              Authorization: `${PexelKey}`,
            },
          }
        );

        data.data.hasOwnProperty('photos') && setPhotos(data.data.photos);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useMemo(() => {
    getPhotos(destination);
  }, [destination]);

  return (
    <section id="photos">
      <fieldset>
        {destination &&
          destination.length > 1 &&
          (photos.length ? (
            photos.map((photo: any) => (
              <div key={photo.src.medium} className="cc-selector">
                <input
                  id={photo.src.medium}
                  type="radio"
                  name="picture"
                  value={photo.src.medium}
                  onChange={(e) => setPhoto(e.target.value)}
                />
                <label
                  className="drinkcard-cc"
                  htmlFor={photo.src.medium}
                  style={{ backgroundImage: 'url(' + photo.src.medium + ')' }}
                ></label>
              </div>
            ))
          ) : (
            <p className="mt-1">No pictures available for this destination</p>
          ))}
      </fieldset>
    </section>
  );
}

export default DestinationPhotos;
