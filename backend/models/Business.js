const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  rating: String,
});

module.exports = mongoose.model('Business', businessSchema);