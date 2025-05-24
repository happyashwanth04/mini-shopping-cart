import React from 'react'

export default function EmptyCart() {
  return (
    <div className='empty-cart'>
        <div className="empty-cart-img-container">
            <img src="/assets/cart-empty-iocn.svg" alt=""className="empty-cart-img"/>
        </div>
        <p className='empty-cart-msg'>Your added items will appear here</p>
    </div>
  )
}
