/**
 * @author Bryan Mejia
 * 
 * @description
 * - Defuining googleMapsService file to provide API usage.
 */

const axios = require('axios');

const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    const location = response.data.results[0]?.geometry?.location;
    if (!location) throw new Error('Unable to get coordinates from address');

    return {
      lat: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    throw new Error('Google Maps API error: ' + error.message);
  }
};

module.exports = {
  getCoordinatesFromAddress,
};
