
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import SearchBar from './components/SearchBar';

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <ul>
        <li>Logo</li>
        <li>Home</li>
        <li>Search</li>
        <li>Map</li>
        <li>Saved Itineraries</li>

      </ul>
      <SearchBar />

    </nav>

  );

}

export default Navbar;