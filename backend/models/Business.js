const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  industry: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  rating: {type: Number, default: 1},
  imageUrl: {type: String},
  rating: {type: Number, default: 1}
});

module.exports = mongoose.model('Business', BusinessSchema);

