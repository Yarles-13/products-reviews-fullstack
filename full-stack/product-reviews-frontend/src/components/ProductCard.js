import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4">
      <img
        src="https://via.placeholder.com/200x200"
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">Category: {product.category}</p>
      <p className="text-lg text-green-600 font-bold mt-2">${product.price}</p>
    </div>
  );
};

export default ProductCard;
