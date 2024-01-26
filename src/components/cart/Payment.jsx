import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import {createOrder} from "../../actions/order-actions";
import { useAlert } from "react-alert";
import {useNavigate} from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import "./Payment.css";

function Payment() {
  const { cartItems, shippingInfo } = useSelector((state) => {
    return state.cart;
  });

  const { currentUser } = useSelector((state) => {
    return state.users;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();
  const payBtn = useRef(null);
  const orderInfo = JSON.parse(sessionStorage.getItem("final pricing"));

  const data = {
    shippingInfo: shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.final,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
  };
  console.log(data);

  const amount = { amount: Math.round(orderInfo.final * 100) };

  async function submitHandler(e) {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const response = await fetch(
        "http://localhost:5000/api/payment/paymentintent",
        {
          method: "POST",
          body: JSON.stringify(amount),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const responseData = await response.json();

      const client_secret = responseData.client_secret;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: currentUser.name,
            email: currentUser.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false

        alert.error(`SOMETHING WENT WRONG!! ${result.error.message}`);
      } else {
        payBtn.current.disabled = false;

        data.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };

        alert.success("PAYMENT SUCCEEDED");

        dispatch(createOrder(data));

        navigate("/order/success");


      }
      payBtn.current.disabled = false;
    } catch (err) {
      alert.error(`AN ERROR OCCURED ${err.message}`);
      payBtn.current.disabled = false;
    }
  }

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input type="submit" ref={payBtn} className="paymentFormBtn" />
        </form>
      </div>
    </Fragment>
  );
}

export default Payment;
