import React from "react";

export default function CartWidget({ cartInfo, id, cartClickHanlder }) {
    return (
      <button
        className={`add-cart-btn ${cartInfo ? "filled" : ""}`}
        id={id}
        onClick={(e) => cartClickHanlder(e, id, "add")}
      >
        {!cartInfo ? (
          <div className="btn-container">
            <img
              className="add-cart-img"
              src="/assets/add-to-cart-icon.svg"
              alt=""
            />
            <span className="add-to-cart-txt">Add to Cart</span>
          </div>
        ) : (
          <div className="btn-container">
            <img
              onClick={(e) => cartClickHanlder(e, id, "dec")}
              className="add-cart-img"
              src="/assets/minus-icon.svg"
              alt=""
            />
            <span className="add-to-cart-txt filled">{cartInfo}</span>

            <img
              onClick={(e) => cartClickHanlder(e, id, "inc")}
              className="add-cart-img"
              src="/assets/plus-icon.svg"
              alt=""
            />
          </div>
        )}
      </button>
    );
}
