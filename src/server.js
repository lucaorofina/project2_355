require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Business Backend API');
});

// Routes
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');

app.use('/api/users', userRoutes);
app.use('/api/businesses', businessRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});