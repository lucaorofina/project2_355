import React from 'react';

const BusinessList = ({ businesses }) => {
  if (businesses.length === 0) {
    return <p>No businesses found. Please try another search.</p>;
  }

  return (
    <div className="business-list">
      <h3>Nearest Businesses</h3>
      <ul>
        {businesses.map((business, index) => (
          <li key={business.id} className="business-item">
            <h4>{index + 1}. {business.name}</h4>
            <p>Address: {business.address || 'No address available'}</p>
            <p>Rating: {business.rating || 'No rating available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;