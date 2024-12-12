const express = require('express');
const router = express.Router();
const Business = require('../models/Business'); 
// GET
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

//POST
router.post('/', async (req, res) => {
  try {
    const businessData = req.body;
    if (!Array.isArray(businessData)) {
      return res.status(400).json({ error: 'Request body should be an array of businesses.' });
    }
    
    await Business.insertMany(businessData);
    res.status(201).json({ message: 'Businesses saved successfully!' });
  } catch (error) {
    console.error('Error saving businesses:', error);
    res.status(500).json({ error: 'Failed to save businesses.' });
  }
});

module.exports = router;