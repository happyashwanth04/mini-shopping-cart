import React from "react";
import "./ProductCard.css";
export default function ProductCard() {
  return (
    <div className="product-card">
      <div className="product-image-container landscape">
        <img
          src="https://orderfoodonline.deno.dev/public/images/image-waffle-desktop.jpg"
          alt="Product Name"
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-details">
        <div className="product-category">Product Category</div>
        <h3 className="product-title">Product Name</h3>
        <p className="product-price">$29.99</p>
      </div>
    </div>
  );
}
