import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import BusinessFinder from './components/BusinessFinder';
import Navbar from './Navbar';
import './App.css';

const App = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  // 💡 State to store the search parameters (businessType, radius)
  const [searchParams, setSearchParams] = useState({ 
    businessType: 'restaurant', 
    radius: 1609 // Default to 1 mile 
  });

  // 📡 Function to handle form submission and update search parameters
  const handleFormSubmit = ({ businessType, radius }) => {
    setSearchParams({ businessType, radius }); // Pass params to BusinessFinder
    console.log('Search parameters submitted:', { businessType, radius });
  };

  return (
    <div className="app">
      <Navbar />
      <h1>Local Business Directory</h1>
      
      {/* business type and radius form */}
      <div className="search-form-container">
        <h3>Search for Businesses</h3>
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          handleFormSubmit({ 
            businessType: e.target.businessType.value, 
            radius: parseInt(e.target.radius.value) 
          });
        }} 
        className="search-form"
        >
          <div className="form-group">
            <label htmlFor="businessType">Business Type</label>
            <select 
              id="businessType" 
              name="businessType"
              defaultValue={searchParams.businessType} 
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
              name="radius"
              defaultValue={searchParams.radius} 
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

      {/* 🌐 Business Finder component receives searchParams as props */}
      <BusinessFinder apiKey={apiKey} searchParams={searchParams} />
    </div>
  );
};

export default App;

// import React, { useState } from 'react';
// import SearchBar from './components/SearchBar';
// import BusinessFinder from './components/BusinessFinder';
// //import MapDisplay from './components/MapDisplay';
// //import BusinessList from './components/BusinessList';
// //import TripPlannerForm from './components/TripPlannerForm';
// import Navbar from './Navbar';
// //import SearchForm from './components/SearchForm';
// //import MapComponent from './components/MapComponent'
// //import BusinessInfoCard from './components/BusinessInfoCard';
// import './App.css';

// const App = () => {
//   // const [businesses, setBusinesses] = useState([]);
//   // const [locations, setLocations] = useState([]);
//   // const [selectedBusiness, setSelectedBusiness] = useState(null);
//   // const [searchParams, setSearchParams] = useState({
//   //   tripType: '',
//   //   budget: '',
//   //   interests: []
//   // });

//   // const handleFormSubmit = async (formData) => {
//   //   setSearchParams(formData);

//   //   try {
//   //     const { tripType, budget, interests } = formData;
//   //     const query = `${tripType} ${interests.join(' ')} budget:${budget}`;
//   //     const response = await fetch(`/api/search?query=${query}`);
//   //     const data = await response.json();

//   //     setBusinesses(data.businesses || []);
//   //     const businessLocations = (data.businesses || []).map((business) => ({
//   //       lat: business.latitude,
//   //       lng: business.longitude,
//   //       name: business.name,
//   //       address: business.address,
//   //       rating: business.rating
//   //     }));
//   //     setLocations(businessLocations);
//   //   } catch (error) {
//   //     console.error('Error fetching businesses:', error);
//   //   }
//   // };

//   // const handleBusinessClick = (business) => {
//   //   setSelectedBusiness(business);
//   // };
//   const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
//   return (
//     <div className="app">
//       <Navbar />
//       <h1>Local Business Directory</h1>
//       <div className="App">
        
//       <h1>Business Finder</h1>
//       <BusinessFinder apiKey={apiKey} />
//     </div>
// {/* 
//       <BusinessList 
//         businesses={businesses} 
//         onBusinessClick={handleBusinessClick} 
//       /> */}

//       <h2>Plan Your Trip</h2>
//     </div>
//   );
// };

// export default App;