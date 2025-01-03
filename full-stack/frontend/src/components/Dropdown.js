// import React from 'react';

// const Dropdown = ({ onSortPrice }) => {
//   return (
//     <div className="dropdown-container">
//       <select onChange={(e) => onSortPrice(e.target.value)}>
//         <option value="">Sort by Price</option>
//         <option value="lowest">Lowest Price</option>
//         <option value="highest">Highest Price</option>
//       </select>
//     </div>
//   );
// };

// export default Dropdown;
import React from 'react';

const Dropdown = ({ onSortPrice, onSortCategory, categories = [] }) => {
  return (
    <div className="dropdown-container">
      {/* Sort by Price */}
      <select onChange={(e) => onSortPrice(e.target.value)}>
        <option value="">Sort by Price</option>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
      </select>

      {/* Sort by Category */}
      <select onChange={(e) => onSortCategory(e.target.value)}>
        <option value="">Filter by Category</option>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))
        ) : (
          <option disabled>No categories available</option>
        )}
      </select>
    </div>
  );
};

export default Dropdown;
