// const Product = require('../models/Product')

// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id); 
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// exports.createProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const result = await Product.findByIdAndDelete(req.params.product);
//     if (!result) {
//       return res.status(404).send('Could not delete');
//     }
//     res.status(200).send('Product deleted');
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// };

// exports.getProducts = async (req, res) => {
//   const { page = 1, category, price, query } = req.query;
//   const limit = 2;
//   const skip = (page - 1) * limit;

//   try {
//     let filter = {}; 

//     if (category) {
//       filter.category = category;
//     }
//     if (query) {
//       filter.name = query;
//     }

//     let productQuery = Product.find(filter);

//     if (price === 'highest') {
//       productQuery = productQuery.sort({ price: -1 }); 
//     } else if (price === 'lowest') {
//       productQuery = productQuery.sort({ price: 1 }); 
//     }

//     productQuery = productQuery.skip(skip).limit(limit);

//     const products = await productQuery.exec();
//     const count = await Product.countDocuments(filter); 

//     res.status(200).json({
//       products,
//       total: count,
//       pages: Math.ceil(count / limit),
//       currentPage: parseInt(page, 10),
//     });
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// };
const Product = require('../models/Product');

// Get all products with filtering (by name, category, price)
exports.getProducts = async (req, res) => {
  const { name, category, price } = req.query;
  let filter = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' };  // Case-insensitive search
  }
  if (category) {
    filter.category = category;
  }
  if (price) {
    filter.price = { $lte: price };
  }

  try {
    const products = await Product.find(filter);  // Fetch products and reviews
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
