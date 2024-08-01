import React from 'react';
import './ProductItem.css';

function ProductItem({ product }) {
    return (
        <div className="product-item">
            <a href={product.link} target="_blank" rel="noopener noreferrer">
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
            </a>
            <p>Price: ₹{product.price}</p>
        </div>
    );
}

export default ProductItem;
