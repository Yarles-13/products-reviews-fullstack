const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ProductsDatabase')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// API Route for Product Data
app.use('/api/products', productRoutes);

// Serve React Frontend
app.use(express.static(path.join(__dirname, '../product-reviews-frontend/build')));

// Fallback Route - Serve index.html if no API routes match
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../product-reviews-frontend/build', 'index.html'));
});

// Start the Server with Error Handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


