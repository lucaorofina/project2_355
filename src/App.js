import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapDisplay from './components/MapDisplay';
import BusinessList from './components/BusinessList';
import TripPlannerForm from './components/TripPlannerForm';
import Navbar from './Navbar';
import './App.css';

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
      <Navbar />


      {/*<SearchBar onSearch={handleSearch} />*/}
        <h1> Local Business Directory</h1>
      <MapDisplay locations={locations} />
      <BusinessList businesses={businesses} />
      <h2>Trip Planner</h2>
      <TripPlannerForm />
    </div>
  );
};

export default App;