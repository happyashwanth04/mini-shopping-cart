import React from "react";
import CartItem from "../Cart/CartItem";
import "./OrderSuccessModal.css";
import "../Cart/CartSection.css";
export default function OrderSuccessModal({
  cartProducts,
  cartTotal,
  onPlaceNewOrder,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="confirm-img-container">
          <img
            src="/assets/order-confirmed-icon.svg"
            alt=""
            className="confirm-img"
          />
        </div>
        <div className="cart-title">Order Confirmed</div>
        <div className="">We hope you enjoy your food!</div>
        {cartProducts.map((cartProduct, ind) => (
          <CartItem
            key={ind}
            cartProduct={cartProduct}
            cartClickHanlder={() => {}}
            showRemoveIcon={false}
          />
        ))}
        <div className="cartitem-total-section">
          <span className="cartitem-title">Order Total</span>
          <span className="cartitem-total-amt">
            {`$${parseFloat(cartTotal).toFixed(2)}`}
          </span>
        </div>
        <button className="confirm-order-btn center" onClick={onPlaceNewOrder}>
          Start New Order
        </button>
      </div>
    </div>
  );
}
