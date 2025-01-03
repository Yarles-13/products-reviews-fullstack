const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routes/products');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/ProductsDatabase')
  .then(() => console.log('MongoDB connected '))
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });


app.use('/api/products', productRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});



const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


