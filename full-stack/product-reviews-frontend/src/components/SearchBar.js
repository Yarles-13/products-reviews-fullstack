import React from 'react';

const SearchBar = ({ onSearch, onSortCategory, onSortPrice }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
      <select
        onChange={(e) => onSortCategory(e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="">Sort by Category</option>
        <option value="Sporting Goods">Sporting Goods</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>
      <select
        onChange={(e) => onSortPrice(e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="">Sort by Price</option>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
      </select>
    </div>
  );
};

export default SearchBar;
