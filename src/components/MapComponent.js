import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '400px',
  height: '400px'
};

const initialCenter = {
  lat: 40.7128,
  lng: -74.0060
};

function MapComponent({ apiKey }) {
  const [markers, setMarkers] = useState([]);

  function fetchPlaceName(lat, lng, callback) {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        callback(results[0].formatted_address);
      } else {
        callback("No address found");
      }
    });
  }

  function onMapClick(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    if (markers.length < 3) {
      fetchPlaceName(lat, lng, (placeName) => {
        const newMarker = {
          lat: lat,
          lng: lng,
          name: placeName
        };

        setMarkers(currentMarkers => [...currentMarkers, newMarker]);
      });
    } else {
      alert("You can only mark up to 3 places.");
    }
  }

  function deleteMarker(indexToDelete) {
    setMarkers(currentMarkers =>
      currentMarkers.filter((_, index) => index !== indexToDelete)
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={initialCenter}
        zoom={12}
        onClick={onMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
          />
        ))}
      </GoogleMap>
      <div>
        <h4>Marked Places</h4>
        <ul>
          {markers.map((marker, index) => (
            <li key={index}>
              {marker.name}{' '}
              <button onClick={() => deleteMarker(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </LoadScript>
  );
}

export default MapComponent;
