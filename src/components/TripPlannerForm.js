import React, { useState } from 'react';
import './Styles/Itinerary.css';

function TripPlannerForm() {
  const [tripType, setTripType] = useState('');
  const [budget, setBudget] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [interests, setInterests] = useState([]);

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleTravelDatesChange = (event) => {
    setTravelDates(event.target.value);
  };

  const handleInterestChange = (event) => {
    const newInterests = [...interests];
    if (event.target.checked) {
      newInterests.push(event.target.value);
    } else {
      const index = newInterests.indexOf(event.target.value);
      if (index > -1) {
        newInterests.splice(index, 1);
      }
    }
    setInterests(newInterests);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here (e.g., send data to server)
    console.log('Trip Type:', tripType);
    console.log('Budget:', budget);
    console.log('Interests:', interests);
  };

  return (
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="tripType">Trip Type:</label>
          <select id="tripType" value={tripType} onChange={handleTripTypeChange}>
            <option value="">Select Trip Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="groceries">Groceries</option>
            <option value="art">Art</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget:</label>
          <select id="budget" value={budget} onChange={handleBudgetChange}>
            <option value="">Select your budget</option>
            <option value="1">Below $10</option>
            <option value="2">$10-$25</option>
            <option value="3">$25-$50</option>
            <option value="4">$50-$100</option>
            <option value="5">$100+</option>
          </select>
        </div>

        <div className="form-group">
          <label>Interests:</label>
          <div>
            <input
                type="checkbox"
                id="history"
                value="history"
                checked={interests.includes('history')}
                onChange={handleInterestChange}
            />
            <label htmlFor="history">History</label>
          </div>
          <div>
            <input
                type="checkbox"
                id="nature"
                value="nature"
                checked={interests.includes('nature')}
                onChange={handleInterestChange}
            />
            <label htmlFor="nature">Nature</label>
          </div>
          <div>
            <input
                type="checkbox"
                id="food"
                value="food"
                checked={interests.includes('food')}
                onChange={handleInterestChange}
            />
            <label htmlFor="food">Food</label>
          </div>
          <div>
            <input
                type="checkbox"
                id="nightlife"
                value="nightlife"
                checked={interests.includes('nightlife')}
                onChange={handleInterestChange}
            />
            <label htmlFor="nightlife">Nightlife</label>
          </div>
          <div>
            <input
                type="checkbox"
                id="shopping"
                value="shopping"
                checked={interests.includes('shopping')}
                onChange={handleInterestChange}
            />
            <label htmlFor="shopping">Shopping</label>
          </div>
        </div>

        <button type="submit">Plan Trip</button>
      </form>
  );
}

export default TripPlannerForm;