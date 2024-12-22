import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-red-500 border rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <img
        src="https://via.placeholder.com/200x200"
        alt={product.name}
        className="w-full h-56 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-red-800 ">{product.name}</h3>
      <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
      <p className="text-lg text-green-500 font-bold mt-2">${product.price}</p>
    </div>
  );
};

export default ProductCard;