import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
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