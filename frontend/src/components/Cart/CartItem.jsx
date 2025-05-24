import React from "react";

export default function CartItem({ cartProduct, cartClickHanlder }) {
  const { name, quantity, price } = cartProduct;
  return (
    <div className="cartitem-container">
      <div className="cartitem-left-section">
        <div className="cartitem-title">{name}</div>
        <div className="cart-item-details">
          <span className="cartitem-quantity">{`${quantity}x`}</span>
          <span className="cartitem-price">{`@${parseFloat(price).toFixed(
            2
          )}`}</span>
          <span className="cartitem-price">{`$${parseFloat(
            price * quantity
          ).toFixed(2)}`}</span>
        </div>
      </div>
      <div
        className="cartitem-right-section"
        onClick={(e) => cartClickHanlder(e, cartProduct.id, "del")}
      >
        <img className="add-cart-img" src="/assets/remove-icon.svg" alt="" />
      </div>
    </div>
  );
}
