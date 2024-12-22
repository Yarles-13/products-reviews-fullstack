import React from 'react';

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
