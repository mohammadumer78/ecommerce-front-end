import React, { Fragment } from "react";
import CheckoutSteps from "./CheckOutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

import "./ConfirmOrder.css";

let subTotal = 0;

const ConfirmOrder = () => {
  const { currentUser } = useSelector((state) => state.users);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  cartItems.map((item) => (subTotal = subTotal + item.quantity * item.price));

  const shippingCharges = subTotal > 2000 ? subTotal : subTotal + 200;

  const tax = shippingCharges * 0.01;

  const final = tax + shippingCharges;

  const navigate = useNavigate();

  function submitHandler(e) {

    sessionStorage.setItem("final pricing", JSON.stringify({ shippingCharges, tax, final }));
    navigate("/payment");
  }

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{currentUser.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{shippingInfo.address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>

            {cartItems.map((item) => {
              return (
                <div className="confirmCartItemsContainer">
                  <div>
                    <img src={item.image.url} alt="Product" />
                    <Link> {item.name}</Link>
                    <span>
                      {item.quantity} X {item.price} =
                      <b> {item.quantity * item.price}</b>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span> {tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>{final}</span>
            </div>

            <button onClick={submitHandler}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
