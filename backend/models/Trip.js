const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  businessType: { type: String, required: true },
  budget: { type: String, required: true },
  interests: { type: [String], required: true }, // Array of interests
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);