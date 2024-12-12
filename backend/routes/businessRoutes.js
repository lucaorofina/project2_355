const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

// Get all businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new business
router.post('/', async (req, res) => {
  const { name, address, industry, imageUrl, review, rating } = req.body;
  try {
    const newBusiness = new Business({ 
      name, 
      address, 
      industry, 
      imageUrl, 
      review, 
      rating 
    });
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;