import React, { Fragment, useState } from "react";

import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

// BACKDROP
import Backdrop from "@material-ui/core/Backdrop";

import { logOutUser } from "../../actions/users-actions";

import { useSelector, useDispatch } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";

import "./User-action.css";

function UserOptions({ currentUser }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [dial, setDial] = useState(false);

  function Dashboard() {
    navigate("/admin/dashboard")
  }

  function Person() {
    navigate("/account");
  }

  function Exit() {

    console.log("exit");

    dispatch(logOutUser());

    localStorage.removeItem("user");

  }

  function List() {
    navigate("/myorders")
  }

  return (
    <Fragment>
      <Backdrop open={dial} style={{ zIndex: "10" }} />

      {currentUser && (
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          style={{ zIndex: "11" }}
          onOpen={() => {
            setDial(true);
          }}
          onClose={() => {
            setDial(false);
          }}
          open={dial}
          direction="down"
          className="speedDial"
          icon={
            <img
              className="speedDialIcon"
              src={
                currentUser.avatar.url ? currentUser.avatar.url : "/Profile.png"
              }
              alt="Profile"
            />
          }
        >
          {currentUser.role == "admin" && (
            <SpeedDialAction
              icon=<DashboardIcon />
              tooltipTitle="Dashboard"
              onClick={Dashboard}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          )}

          <SpeedDialAction
            icon=<PersonIcon />
            tooltipTitle="Person"
            onClick={Person}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />

          <SpeedDialAction
            icon=<ListAltIcon />
            tooltipTitle="List"
            onClick={List}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />

          <SpeedDialAction
            icon=<ExitToAppIcon />
            tooltipTitle="Exit"
            onClick={Exit}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        </SpeedDial>
      )}
    </Fragment>
  );
}
export default UserOptions;
