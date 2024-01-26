import React, { useEffect } from 'react';
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import {Link} from "react-router-dom";
import { Typography } from "@material-ui/core";
import {adminInventory} from "../../actions/admin-actions";
import "chart.js/auto";
import { Line,Doughnut } from "react-chartjs-2";
import "./dashboard.css";
import { useDispatch, useSelector } from 'react-redux';

function AdminDashBoard() {


  const dispatch = useDispatch();

  const {products} = useSelector((state)=>{return state.Inventory});

useEffect(()=>{
  dispatch(adminInventory());


},[])

console.log(products);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 10],
      }
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [20,40,70],
      },
    ],
  };
  
  return (
    <div className="dashboard">
    <MetaData title="Dashboard - Admin Panel" />
    <Sidebar />

    <div className="dashboardContainer">
      <Typography component="h1">Dashboard</Typography>

      <div className="dashboardSummary">
        <div>
          <p>
            Total Amount <br />
          </p>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products">
            <p>Product</p>
            <p>{products.length}</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p></p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p></p>
          </Link>
        </div>
      </div>

      <div className="lineChart">
      <Line data={lineState} style={{ width: "80%",
        margin: "auto"}} />
      </div>

      <div className="doughnutChart">
      <Doughnut data={doughnutState} />
      </div>
    </div>
  </div>
  )
}

export default AdminDashBoard