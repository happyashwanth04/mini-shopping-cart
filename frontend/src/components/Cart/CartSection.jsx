import React, { useCallback, useState } from "react";
import EmptyCart from "./EmptyCart";
import "./CartSection.css";
import CartItem from "./CartItem";
import { post } from "../../serviceProxy";
export default function CartSection({
  cartTotal,
  cartClickHanlder,
  cartProducts,
  setOrderSuccess,
}) {
  const [clicked, setClicked] = useState(false);
  const [orderFailed, setOrderFailed] = useState(false);
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

  const onConfirmOrder = async (e) => {
    e.preventDefault();
    setOrderFailed(false);
    if (clicked) {
      return;
    }
    setClicked(true);
    const items = cartProducts.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    const payload = {
      items,
    };
    try {
      const result = await post("/order", payload);
      if (result.data) {
        setOrderFailed(false);
        setOrderSuccess(true);
      } else {
        setOrderFailed(true);
      }
    } catch (error) {
      setOrderFailed(true);
    } finally {
      setClicked(false);
    }
  };

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
      {orderFailed ? (
        <div className="order-failed">Order failed try again</div>
      ) : null}
      <button
        className="confirm-order-btn"
        disabled={clicked}
        onClick={onConfirmOrder}
      >
        Confirm Order
      </button>
    </div>
  );
}
