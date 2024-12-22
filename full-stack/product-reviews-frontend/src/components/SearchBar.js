import React from 'react';

const SearchBar = ({ onSortPrice }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* Price Sorting Dropdown */}
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