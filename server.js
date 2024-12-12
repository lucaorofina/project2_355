const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

const businessSchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  rating: String,
});

const Business = mongoose.model('Business', businessSchema);

app.post('/api/businesses', async (req, res) => {
  try {
    const businessData = req.body; 
    console.log('📩 Received business data:', businessData); 

    if (!Array.isArray(businessData)) {
      return res.status(400).json({ error: 'Request body should be an array of businesses.' });
    }
    
    const insertedBusinesses = await Business.insertMany(businessData);
    res.status(201).json({ message: 'Businesses saved successfully!', data: insertedBusinesses });
  } catch (error) {
    console.error('❌ Error saving businesses:', error);
    res.status(500).json({ error: 'Failed to save businesses.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});