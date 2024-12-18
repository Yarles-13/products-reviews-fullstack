const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ProductsDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const productRoutes = require('./routes/products');

// Base route
app.get('/', (req, res) => {
  res.send('<h1>Success</h1>');
});

// Use combined routes
app.use('/products', productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
