import react from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  cosnt[loading, setLoading] = useState(true)


  if (loading) return <p>Loading products</p>

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => {
          <li key={product.id}>
           <Link to={`/products/${product._id}`}>{product.name}</Link>
          </li>
        })}
      </ul>
    </div>
  )
}

export default ProductList