import React, { Fragment } from "react";

import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../actions/cart-actions";

import { useNavigate } from "react-router-dom";

import "./Cart.css";

let grossTotal =0;

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const navigate= useNavigate();

  function increase(s, id, q) {


    if (s <= q) return;
    const quantity = q + 1;
    dispatch(addToCart(id, quantity));
  }

  function decrease(id, q) {
    if (q <= 1) return;
    const quantity = q - 1;
    dispatch(addToCart(id, quantity));
  }

  function checkoutHandler(){

    navigate("/login?redirect=shipping");


  }

  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
       {cartItems && cartItems.map((item)=>
        <div className="cartContainer">
       <CartItem items={item} />
       <div className="cartInput">
         <button
           onClick={() => decrease(item.id, item.quantity)}
         >
           -
         </button>
         <input type="number" value={item.quantity} readOnly />
         <button
           onClick={() =>
             increase(
                item.stock,
               item.id,
               item.quantity
             )
           }
         >
           +
         </button>
       </div>
       <p className="cartSubtotal"> Rs/{item.price * item.quantity} </p>
     </div>)}
       
        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p> {cartItems.map((item)=>{

                grossTotal = grossTotal +(item.price * item.quantity);

            })}
            {grossTotal}
            </p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkoutHandler}>Check Out</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cart;
