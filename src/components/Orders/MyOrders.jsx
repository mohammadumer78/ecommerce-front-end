import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import { Orders } from "../../actions/order-actions";
import "./myOrders.css";

function MyOrders() {
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => {
    return state.myOrders;
  });

  const { currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(Orders());
  }, []);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 300, flex: 1 },

    {
      field: "statusId",
      headerName: "STATUS",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "quantityId",
      headerName: "QUANTITY",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amountId",
      headerName: "AMOUNT",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "activityId",
      headerName: "ACTIVITY",
      sortable: false,
      type: "number",
      flex: 0.3,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  order &&
    order.map((item) => {
      rows.push({
        id: item._id,
        statusId: item.orderStatus,
        quantityId: item.orderItems.length,
        amountId: item.totalPrice,
      });
    });

  return (
    <Fragment>
      <MetaData title={`${currentUser.name} Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">
              {currentUser.name}'s Orders
            </Typography>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default MyOrders;
