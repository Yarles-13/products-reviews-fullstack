import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src="https://via.placeholder.com/200x200"
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p className="price">${product.price}</p>
    </div>
  );
};

export default ProductCard;
