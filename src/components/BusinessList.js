import React from 'react';

const BusinessList = ({ businesses }) => {
  return (
    <div className="business-list">
      {businesses.length > 0 ? (
        businesses.map((business, index) => (
          <div className="business-card" key={index}>
            <h3>{business.name}</h3>
            <p>{business.address}</p>
            <p>Rating: {business.rating} ⭐</p>
          </div>
        ))
      ) : (
        <p>No businesses found. Try another search.</p>
      )}
    </div>
  );
};

export default BusinessList;