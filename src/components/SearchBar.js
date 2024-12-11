import React, { useState } from 'react';
import './Styles/SearchBar.css'


const SearchBar = ({ onSearch }) => {
  console.log("Received onSearch prop:", onSearch); // Add this line

  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (typeof onSearch === 'function') {
      onSearch(query);
    } else {
      console.error("onSearch is not a function");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
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


export default SearchBar;