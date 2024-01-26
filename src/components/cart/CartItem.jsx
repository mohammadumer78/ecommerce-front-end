import React from 'react'

import { Link } from 'react-router-dom';

import "./CartItemCard.css";

function CartItem({items}) {
  return (
    <div className="CartItemCard">
      <img  src={items.image.url} alt="ssa" />
      <div>
        <Link to={`/product/${items.id}`} > {items.name}</Link>
        <span>{items.price}</span>
        <p>Remove</p>
      </div>
    </div>
  )
}

export default CartItem