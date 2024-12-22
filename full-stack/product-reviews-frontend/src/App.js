import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('/products')  // Proxy will forward to http://localhost:4000/products
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched products:', data.products);  // Debugging
        setProducts(data.products);  // Populate with API data
        setFilteredProducts(data.products);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);
  
  

  const handleSearch = (input) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSortCategory = (category) => {
    const filtered = category
      ? products.filter((product) => product.category === category)
      : products;
    setFilteredProducts(filtered);
  };

  const handleSortPrice = (sortOrder) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return sortOrder === 'lowest' ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Product Store</h1>
      <SearchBar
        onSearch={handleSearch}
        onSortCategory={handleSortCategory}
        onSortPrice={handleSortPrice}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default App;
