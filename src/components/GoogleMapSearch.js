import React, { useEffect, useState } from 'react';

const GoogleMapSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps API is loaded
    const checkGoogleMaps = () => {
      if (typeof window.google !== 'undefined' && window.google.maps) {
        setIsApiLoaded(true);
      } else {
        setTimeout(checkGoogleMaps, 100); // Check every 100ms
      }
    };

    checkGoogleMaps();
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch && isApiLoaded) {
      onSearch(query); // Call onSearch function
    } else {
      console.error('Google Maps API is not loaded');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="google-map-search">
      <input
        type="text"
        placeholder="Search for a business..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default GoogleMapSearch;
