
const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { name, category, price } = req.query;
  let filter = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' };  
  }
  if (category) {
    filter.category = category;
  }
  if (price) {
    filter.price = { $lte: price };
  }

  try {
    const products = await Product.find(filter); 
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
