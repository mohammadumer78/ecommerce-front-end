import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { deleteReview } from "../../actions/admin-actions";
import SideBar from "./Sidebar";
import { productReviews } from "../../actions/admin-actions";
import "./adminReviews.css";

function AdminReviews() {

  const { Reviews } = useSelector((state) => {
    return state.adminReviews;
  });

  const dispatch = useDispatch();

  const [id, setId] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    dispatch(productReviews(id));
  }

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() => {
                dispatch(deleteReview(id,params.getValue(params.id, "id")));
              }}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  Reviews &&
    Reviews.map((review) => {
      rows.push({
        id: review._id,
        user: review.name,
        comment: review.comment,

        rating: review.rating,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form className="productReviewsForm">
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
            </div>

            <Button id="createProductBtn" type="submit" onClick={submitHandler}>
              Search
            </Button>
          </form>

          {Reviews && Reviews ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default AdminReviews;
