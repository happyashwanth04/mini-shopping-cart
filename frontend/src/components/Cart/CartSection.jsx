import React, { useCallback } from "react";
import EmptyCart from "./EmptyCart";
import "./CartSection.css";
import CartItem from "./CartItem";
export default function CartSection({
  cartTotal,
  cartClickHanlder,
  cartProducts,
}) {
  const getTotlaProducts = useCallback(() => {
    return cartProducts?.reduce((acc, curr) => (acc += curr.quantity), 0) || 0;
  }, [cartTotal]);

  if (!cartProducts.length) {
    return (
      <div className="cart-container">
        <div className="cart-title">{`Your Cart (${getTotlaProducts()})`}</div>
        <EmptyCart />
      </div>
    );
  }
  return (
    <div className="cart-container">
      <div className="cart-title">{`Your Cart (${getTotlaProducts()})`}</div>
      {cartProducts.map((cartProduct, ind) => (
        <CartItem
          key={ind}
          cartProduct={cartProduct}
          cartClickHanlder={cartClickHanlder}
        />
      ))}
      <div className="cartitem-total-section">
        <span className="cartitem-title">Order Total</span>
        <span className="cartitem-total-amt">
          {`$${parseFloat(cartTotal).toFixed(2)}`}
        </span>
      </div>

      <button className="add-cart-button large">Confirm Order</button>
    </div>
  );
}
