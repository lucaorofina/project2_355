import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapDisplay from './components/MapDisplay';
import BusinessList from './components/BusinessList';

const App = () => {
  const [businesses, setBusinesses] = useState([]);
  const [locations, setLocations] = useState([]);

  const handleSearch = async (query) => {
    // Simulate an API call (Replace with a real API)
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setBusinesses(data.businesses);
    
    const businessLocations = data.businesses.map(business => ({
      lat: business.latitude,
      lng: business.longitude,
    }));
    setLocations(businessLocations);
  };

  return (
    <div className="app">
      <h1>Business Directory</h1>
      <SearchBar onSearch={handleSearch} />
      <MapDisplay locations={locations} />
      <BusinessList businesses={businesses} />
    </div>
  );
};

export default App;