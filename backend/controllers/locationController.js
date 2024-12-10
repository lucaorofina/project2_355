/**
 * @author Bryan Mejia
 * 
 * @description 
 * - Contains controller logic for creating, reading, updating and 
 *   deleting locations. (CRUD)
 */

const Location = require('../models/location');
const googleMapsService = require('../services/googleMapsService');

// Create a new location
const createLocation = async (req, res) => {
  const { name, address } = req.body;

  try {
    const coordinates = await googleMapsService.getCoordinatesFromAddress(address);
    const newLocation = new Location({
      name,
      address,
      coordinates,
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get location by ID
const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update location by ID
const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    const coordinates = await googleMapsService.getCoordinatesFromAddress(address);
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, address, coordinates },
      { new: true }
    );

    if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete location by ID
const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLocation = await Location.findByIdAndDelete(id);
    if (!deletedLocation) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
