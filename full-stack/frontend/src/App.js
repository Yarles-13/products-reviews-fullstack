// import React, { useState, useEffect } from 'react';
// import ProductGrid from './components/ProductGrid';
// import Dropdown from './components/Dropdown';
// import SearchBar from './components/SearchBar';
// import './index.css';

// function App() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [error, setError] = useState(null);

//   // Fetch products
//   useEffect(() => {
//     fetch('http://localhost:8080/api/products')

//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data.products);
//         setFilteredProducts(data.products);  
//       })
//       .catch((err) => setError('Failed to fetch products'));
//   }, []);

//   const handleSortPrice = (sortOrder) => {
//     const sorted = [...filteredProducts].sort((a, b) => {
//       return sortOrder === 'lowest' ? a.price - b.price : b.price - a.price;
//     });
//     setFilteredProducts(sorted);
//   };

 
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   if (error) return <div>{error}{' no soup for you'}</div>;

//   return (
//     <div className="">
//       <h1 className="title">Product Store</h1>
      
//       <div className=''>
//       <SearchBar 
//         searchQuery={searchQuery} 
//         onSearch={handleSearch} 
//       />
//       </div>

     
//       <Dropdown
//         onSortPrice={handleSortPrice}
//       />
    
  
//       <ProductGrid products={filteredProducts} />
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import Dropdown from './components/Dropdown';
import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch products and categories from MongoDB
  useEffect(() => {
    // Fetch products
    fetch('http://localhost:8080/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((err) => setError('Failed to fetch products'));

    // Fetch categories
    fetch('http://localhost:8080/api/products/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((err) => setError('Failed to fetch categories'));
  }, []);

  // Handle Price Sorting
  const handleSortPrice = (sortOrder) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return sortOrder === 'lowest' ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
  };

  // Handle Category Filtering
  const handleSortCategory = (category) => {
    if (category === '') {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="">
      <h1 className="title">Product Store</h1>

      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

      <Dropdown
        onSortPrice={handleSortPrice}
        onSortCategory={handleSortCategory}
        categories={categories}
      />

      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default App;
