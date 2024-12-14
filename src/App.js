import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapDisplay from './components/MapDisplay';
import BusinessList from './components/BusinessList';
import TripPlannerForm from './components/TripPlannerForm';
import Navbar from './Navbar';
import BusinessInfoCard from './components/BusinessInfoCard';
import GoogleMapSearch from './components/GoogleMapSearch';
import MapComponent from './components/MapComponent';
import BusinessInfoCard from './components/BusinessInfoCard'
import './App.css';

const App = () => {
  const [businesses, setBusinesses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [businessInfoCard, setBusinessInfoCard] = useState([]);

  const googleMapsApiKey = "AIzaSyB-lGjyHQYQQFSqCqKW-AcxdmD_7itkN20";

  const handleSearch = async (query) => {
    const googleMapsSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyB-lGjyHQYQQFSqCqKW-AcxdmD_7itkN20`;

    const response = await fetch(googleMapsSearchUrl);
    const data = await response.json();

    // Assuming `data.results` contains the places returned by Google Maps API
    const businesses = data.results.map(business => ({
      name: business.name,
      latitude: business.geometry.location.lat,
      longitude: business.geometry.location.lng,
    }));

    setBusinesses(businesses);

    const businessLocations = businesses.map(business => ({
      lat: business.latitude,
      lng: business.longitude,
    }));

    setLocations(businessLocations); // Update locations state with the places' coordinates

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


  return (
    <div className="app">
      <Navbar />
      <h1>Local Business Directory</h1>

      {/* Search bar for handling business search */}
      {/* <SearchBar onSearch={handleSearch} /> */}

      {/*<SearchBar onSearch={handleSearch} />*/}
        <h1> Local Business Directory</h1>

      <GoogleMapSearch onSearch={handleSearch} />

     
      <h2> Interactive Map</h2>
      <MapComponent apiKey={googleMapsApiKey} />

      <MapDisplay locations={locations} />

      
      <BusinessList businesses={businesses} />
      <BusinessInfoCard businessInfoCard={businessInfoCard} />

      {/* Map displaying business locations */}
      <MapDisplay locations={locations} />

      {/* List of businesses */}
      <BusinessList businesses={businesses} />

      <BusinessInfoCard businessInfoCard={businessInfoCard} />

      {/* Trip Planner Section */}
      <h2>Trip Planner</h2>
      <TripPlannerForm />

      {/* Adding MapComponent To Web App*/}

    </div>
  );
};

};

};

export default App;
  
