import React from "react";
import { useContext } from "react";
import "./ProductCard.css";
import {DeviceTypeContext} from "../../contexts/useDeviceType";

export default function ProductCard({product}) {
  const deviceContext = useContext(DeviceTypeContext)
  const {id, image, name, category, price} = product
  const {mobile, tablet, desktop} = image
  const imageSrc = deviceContext === 'mobile' ? mobile : 'tablet' ? tablet : desktop
  return (
    <div className="product-card" id={id}>
      <div className="product-image-container landscape">
        <img
          src={imageSrc}
          alt="Product Name"
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-details">
        <div className="product-category">{category}</div>
        <h3 className="product-title">{name}</h3>
        <p className="product-price">{`$${parseFloat(price).toFixed(2)}`}</p>
      </div>
    </div>
  );
}
