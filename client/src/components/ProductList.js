import React, { useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import './ProductList.css';

function ProductList() {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div className="product-list-container">
            <h1>Product Search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
            />
            <button onClick={handleSearch}>Search</button>
            <div className="product-list">
                {products.map((product, index) => (
                    <ProductItem key={index} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
