import React, { useState } from 'react';

const SearchForm = ({ onFormSubmit }) => {
  const [businessType, setBusinessType] = useState('restaurant');
  const [radius, setRadius] = useState(1609); // 1 mile from meters

  const handleBusinessTypeChange = (e) => {
    setBusinessType(e.target.value);
  };

  const handleRadiusChange = (e) => {
    setRadius(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the parent function to send the form data to App.js
    onFormSubmit({ businessType, radius });
  };
  
  return (
    <div className="search-form-container">
      <h3>Search for Businesses</h3>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="businessType">Business Type</label>
          <select 
            id="businessType" 
            value={businessType} 
            onChange={handleBusinessTypeChange}
            className="form-control"
          >
            <option value="restaurant">Restaurant</option>
            <option value="hotel">Hotel</option>
            <option value="gas_station">Gas Station</option>
            <option value="grocery_or_supermarket">Grocery Store</option>
            <option value="cafe">Cafe</option>
            <option value="gym">Gym</option>
            <option value="park">Park</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="library">Library</option>
            <option value="deli">Deli</option>
            <option value="convenience_store">Convenience Store</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="radius">Select Radius</label>
          <select 
            id="radius" 
            value={radius} 
            onChange={handleRadiusChange} 
            className="form-control"
          >
            <option value={1609}>1 Mile</option>
            <option value={8046}>5 Miles</option>
            <option value={16093}>10 Miles</option>
            <option value={32187}>20+ Miles</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;