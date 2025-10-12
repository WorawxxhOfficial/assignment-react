import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Product from './Product';
import AddForm from './Product/AddForm';

let currentProductId = 9;

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const products = await axios.get(
        'https://68eb2acf76b3362414ccfcd5.mockapi.io/Products'
      );
      setProducts(products.data);
    }

    getProducts();
  }, []);

  function addProduct(product) {
    const newProduct = { id: ++currentProductId, ...product };
    setProducts([...products, newProduct]);
  }

  return (
    <>
      <h1>New Products</h1>
      {products.length > 0 ? (
        <ul className="Home__products">
          {products.map((product) => (
            <Product key={product.id} item={product} />
          ))}
        </ul>
      ) : (
        <div>Loading products....</div>
      )}
      <AddForm addProduct={addProduct} />
    </>
  );
}
