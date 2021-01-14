import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import { GoogleKey } from '../../config';

interface IProps {
  latitude: string;
  longitude: string;
}

const MapCoordinates = ({ latitude, longitude }: IProps) => {
  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      initMap();
    });
  }, []);

  const myLatLng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

  function initMap(): void {
    let map = new window.google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: myLatLng,
        zoom: 9,
      }
    );
    new window.google.maps.Marker({
      position: myLatLng,
      map,
      title: 'Hello World!',
    });
  }

  return (
    <div
      style={{ width: '500px', height: '500px' }}
      className="card shadow-hover shadow mb-4"
    >
      <div id="map" />
    </div>
  );
};

export default MapCoordinates;
