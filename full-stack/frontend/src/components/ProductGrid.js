import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const [openProductId, setOpenProductId] = useState(null);

  const toggleReviews = (productId) => {
    setOpenProductId(openProductId === productId ? null : productId);
  };

  return (
    <div className="bg-green-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white border rounded-xl shadow-md p-6"
        >
          <div
            className="cursor-pointer flex justify-between items-center"
            onClick={() => toggleReviews(product._id)}
          >
            <ProductCard product={product} />
            <span className="text-3xl font-light text-gray-600">
              {openProductId === product._id ? '−' : '+'}
            </span>
          </div>

          {openProductId === product._id && (
            <div className="bg-red-500 mt-6 border-t pt-4 transition-all duration-300">
              <h3 className="font-semibold text-lg text-gray-700">Reviews:</h3>
              {product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 mt-3 bg-gray-50 border rounded-md"
                  >
                    <p className="text-sm text-gray-700">
                      <strong className="text-blue-500">{review.userName}:</strong>{' '}
                      {review.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;