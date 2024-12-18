const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const productRoutes = require('./routes/products');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow frontend to connect to the backend


mongoose
  .connect('mongodb://localhost:27017/ProductsDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('<h1>Backend Server is Running</h1>');
});


app.use('/products', productRoutes);


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
