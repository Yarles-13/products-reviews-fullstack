// import React, { useState, useEffect } from 'react';
// import ProductGrid from './components/ProductGrid';
// import SearchBar from './components/SearchBar';
// import './index.css';

// function App() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);   // Loading state
//   const [error, setError] = useState(null);       // Error state

//   // Fetch products from backend API
//   useEffect(() => {
//     setLoading(true);  // Set loading before fetch
//     fetch('/api/products')  // Express backend serves data here
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log('Fetched products:', data.products);  // Debugging
//         setProducts(data.products);  // Store API data
//         setFilteredProducts(data.products);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching products:', err);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Handle search filter
//   const handleSearch = (input) => {
//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(input.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   // Handle category filter
//   const handleSortCategory = (category) => {
//     const filtered = category
//       ? products.filter((product) => product.category === category)
//       : products;
//     setFilteredProducts(filtered);
//   };

//   // Handle price sorting
//   const handleSortPrice = (sortOrder) => {
//     const sorted = [...filteredProducts].sort((a, b) => {
//       return sortOrder === 'lowest' ? a.price - b.price : b.price - a.price;
//     });
//     setFilteredProducts(sorted);
//   };

//   // Loading indicator
//   if (loading) {
//     return <div className="text-center py-10">Loading products...</div>;
//   }

//   // Error indicator
//   if (error) {
//     return (
//       <div className="text-center py-10 text-red-500">
//         Failed to load products: {error}
//       </div>
//     );
//   }

//   // Main rendering
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-center mb-6">Product Store</h1>
//       <SearchBar
//         onSearch={handleSearch}
//         onSortCategory={handleSortCategory}
//         onSortPrice={handleSortPrice}
//       />
//       <ProductGrid products={filteredProducts} />
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')  // Fetch products from backend
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);  // Initially show all products
      })
      .catch((err) => setError('Failed to fetch products'));
  }, []);

  // Price Sorting (Ascending or Descending)
  const handleSortPrice = (sortOrder) => {
    const sorted = [...products].sort((a, b) => {
      return sortOrder === 'lowest' ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Product Store</h1>
      
      {/* SearchBar with Price Sorting */}
      <SearchBar
        onSortPrice={handleSortPrice}
      />
      
      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default App;
