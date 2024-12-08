import React, { useEffect, useRef } from 'react';

const MapDisplay = ({ locations }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
        zoom: 12,
      });

      locations.forEach(location => {
        new window.google.maps.Marker({
          position: location,
          map: map,
        });
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, [locations]);

  return (
    <div className="map-container" ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
  );
};

export default MapDisplay;