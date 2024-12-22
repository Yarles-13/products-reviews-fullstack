import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import Dropdown from './components/Dropdown';
import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    fetch('/api/products') 
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);  
      })
      .catch((err) => setError('Failed to fetch products'));
  }, []);

  // Handle Sorting by Price
  const handleSortPrice = (sortOrder) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return sortOrder === 'lowest' ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
  };

  // Handle Search Filtering
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Product Store</h1>
      
      {/* Search Bar Component */}
      <div className='bg-red-500'>
      <SearchBar 
        searchQuery={searchQuery} 
        onSearch={handleSearch} 
      />
      </div>

      {/* Dropdown for Sorting by Price */}
      <Dropdown
        onSortPrice={handleSortPrice}
      />
    
      {/* Product List */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default App;
