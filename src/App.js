import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapDisplay from './components/MapDisplay';
import BusinessList from './components/BusinessList';
import TripPlannerForm from './components/TripPlannerForm';
import Navbar from './Navbar';
import BusinessInfoCard from './components/BusinessInfoCard'
import './App.css';

const App = () => {
  const [businesses, setBusinesses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [businessInfoCard, setBusinessInfoCard] = useState([]);

  const handleSearch = async (query) => {
    try {
      // Simulate an API call (Replace with your actual API endpoint)
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();

      // Update businesses and extract locations for the map
      setBusinesses(data.businesses || []);
      const businessLocations = (data.businesses || []).map((business) => ({
        lat: business.latitude,
        lng: business.longitude,
      }));
      setLocations(businessLocations);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <h1>Local Business Directory</h1>

      {/* Search bar for handling business search */}
      {/* <SearchBar onSearch={handleSearch} /> */}

      {/* Map displaying business locations */}
      <MapDisplay locations={locations} />

      {/* List of businesses */}
      <BusinessList businesses={businesses} />

      <BusinessInfoCard businessInfoCard={businessInfoCard} />

      {/* Trip Planner Section */}
      <h2>Trip Planner</h2>
      <TripPlannerForm />
    </div>
  );
};

export default App;
