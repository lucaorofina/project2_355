import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 40.7128, // Example: New York City latitude
  lng: -74.0060 // Example: New York City longitude
};

const MapDisplay = () => {
  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB-lGjyHQYQQFSqCqKW-AcxdmD_7itkN20"
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={center} 
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default MapDisplay;
