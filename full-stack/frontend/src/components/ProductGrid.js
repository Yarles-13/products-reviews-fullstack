import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const [openProductId, setOpenProductId] = useState(null);

  const toggleReviews = (productId) => {
    setOpenProductId(openProductId === productId ? null : productId);
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product._id} className="product-item">
          <div
            className="cursor-pointer flex justify-between items-center"
            onClick={() => toggleReviews(product._id)}
          >
            <ProductCard product={product} />
            <span className="toggle-icon">
              {openProductId === product._id ? '−' : '+'}
            </span>
          </div>

          {openProductId === product._id && (
            <div className="review-section">
              <h3>Reviews:</h3>
              {product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <p>
                      <strong>{review.userName}:</strong> {review.text}
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
