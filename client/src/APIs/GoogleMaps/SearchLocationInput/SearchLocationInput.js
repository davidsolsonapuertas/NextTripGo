import React, { useState, useEffect, useRef } from 'react';

import './SearchLocationInput.css';

import { GoogleKey } from '../../../config';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef, setFormatedAddress) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current
  );
  autoComplete.setFields([
    'address_components',
    'formatted_address',
    'geometry',
  ]);
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(updateQuery, setFormatedAddress)
  );
}

async function handlePlaceSelect(updateQuery, setFormatedAddress) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  if (typeof addressObject !== 'undefined') {
    setFormatedAddress([
      query,
      addressObject?.geometry?.location.lat().toString(),
      addressObject?.geometry?.location.lng().toString(),
    ]);
  }
}

function SearchLocationInput({ setFormatedAddress, placeholder, styles }) {
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef, setFormatedAddress)
    );
  }, [autoCompleteRef, setFormatedAddress]);

  return (
    <input
      className={styles}
      ref={autoCompleteRef}
      onChange={(event) => setQuery(event.target.value)}
      placeholder={placeholder}
      value={query}
    />
  );
}
export default SearchLocationInput;
