import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import BusinessList from './BusinessList';
import './Styles/BusinessFinder.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const BusinessFinder = ({ apiKey, searchParams }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setPosition(userPosition);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
      setPosition({ lat: 40.7128, lng: -74.0060 }); 
    }
  }, []);

  const searchNearbyBusinesses = useCallback((position, businessType, radius) => {
    if (!position || !map) return; 

    setLoading(true); 

    const request = {
      location: position,
      radius: radius, 
      type: [businessType],
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      setLoading(false); 

      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const newMarkers = results.map(place => ({
          id: place.place_id,
          position: place.geometry.location,
          name: place.name,
        }));
        setMarkers(newMarkers);

        const top5Businesses = results.slice(0, 5).map(place => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          rating: place.rating || 'No rating available',
        }));

        setBusinessList(top5Businesses);
        sendBusinessesToServer(top5Businesses);
      }
    });
  }, [map]);

  const sendBusinessesToServer = async (businessList) => {
    try {
      const response = await fetch('http://localhost:3002/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(businessList),
      });

      const result = await response.json();
      console.log('📤 Sent to MongoDB:', result);
    } catch (error) {
      console.error('❌ Error sending to MongoDB:', error);
    }
  };

  useEffect(() => {
    if (searchParams && position) {
      const { businessType, radius } = searchParams;
      searchNearbyBusinesses(position, businessType, radius);
    }
  }, [searchParams, position, searchNearbyBusinesses]);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  return (
    <div className="business-finder-container">
      <h2>Find Local Businesses</h2>

      <div className="business-layout">
        <div className="sidebar">
          {loading ? (
            <p>Loading businesses...</p>
          ) : (
            <BusinessList businesses={businessList} />
          )}
        </div>

        <div className="map">
          <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={position}
              zoom={15}
              onLoad={onLoad}
            >
              {markers.map((marker) => (
                <Marker 
                  key={marker.id} 
                  position={marker.position} 
                  title={marker.name} 
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default BusinessFinder;