import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const defaultCenter = {
  lat: 40.7128, // New York City default
  lng: -74.0060
};

const MapDisplay = ({ locations }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  const [map, setMap] = useState(null);

  const handleLoad = (mapInstance) => {
    setMap(mapInstance);
    const service = new window.google.maps.places.PlacesService(mapInstance);
    const request = {
      location: defaultCenter,
      radius: 5000,
      keyword: 'sushi'
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log('Nearby Search Results:', results);
      } else {
        console.error('Nearby Search Failed:', status);
      }
    });
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      center={defaultCenter} 
      zoom={12}
      onLoad={handleLoad}
    >
      {locations.map((location, index) => (
        <Marker key={index} position={location} />
      ))}
    </GoogleMap>
  );
};

export default MapDisplay;