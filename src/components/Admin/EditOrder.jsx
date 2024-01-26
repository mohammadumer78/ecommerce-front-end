import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useParams,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import { getOrderDetails } from "../../actions/order-actions";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { editOrder } from "../../actions/admin-actions";
import { Button } from "@material-ui/core";
import "./editOrder.css";

function EditOrder() {
    const dispatch = useDispatch(); 

    const id = useParams().id;

    const navigate = useNavigate();


  const { orderDetails, error, loading } = useSelector(
    (state) => state.orderDetails
  );

  const [status, setStatus] =useState(""); 

  function statusHandler(e){
    setStatus(e.target.value);
    
  }

  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  function submitHandler(e)
  {
    e.preventDefault();
    const updatedStatus = {status:status};
    dispatch(editOrder(id,updatedStatus));
    navigate("/admin/orders");
  }

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <div
            className="confirmOrderPage"
               >
            <div>
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{orderDetails.user && orderDetails.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {orderDetails.shippingInfo &&
                        orderDetails.shippingInfo.phone}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {" "}
                      {orderDetails.shippingInfo &&
                        orderDetails.shippingInfo.address}
                    </span>
                  </div>
                </div>

                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        orderDetails.paymentInfo &&
                        orderDetails.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {orderDetails.paymentInfo &&
                      orderDetails.paymentInfo.status == "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>
                      {" "}
                      {orderDetails.totalPrice && orderDetails.totalPrice}
                    </span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        orderDetails.orderStatus && orderDetails.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {" "}
                      {orderDetails.orderStatus && orderDetails.orderStatus}
                    </p>
                  </div>
                </div>
              </div>

            </div>
            {/*  */}
            <div
            style={{
              display: orderDetails.orderStatus === "Delivered" ? "none" : "block",
            }}
            >
              <form className="updateOrderForm" onSubmit={submitHandler}>
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select onChange={statusHandler}>
                    <option value="">Choose Category</option>

                    <option  value="Shipped">Shipped</option>

                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <Button id="createProductBtn" type="submit">
                  Process
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditOrder;
