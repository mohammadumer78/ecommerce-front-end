import React, { Fragment, useState } from "react";

// SPEED DIAL
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

// BACKDROP
import Backdrop from "@material-ui/core/Backdrop";

// ICONS
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";

// REDIRECTION
import { useNavigate } from "react-router-dom";

//CUSTOM COMPONENTS
import { logoutUser } from "../../actions/users-actions";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";

function UserOptions({ currentUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function dashboard() {

    console.log("dashboard");
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/myorders");
  }
  function account() {
    navigate("/account");
  }

  function logout() {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <Fragment>
      {/* BACKDROP */}

      <Backdrop open={open} style={{ zIndex: "10" }} />

      {/* SPEED DIAL */}

      {currentUser && (
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          style={{ zIndex: "11" }}
          open={open}
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
              onClick={ dashboard}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          )}

          <SpeedDialAction
            icon=<PersonIcon />
            tooltipTitle="Profile"
            onClick={account}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />

          <SpeedDialAction
            icon=<ListAltIcon />
            tooltipTitle="Profile"
            onClick={orders}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />

          <SpeedDialAction
            icon=<ExitToAppIcon />
            tooltipTitle="Logout"
            onClick={logout}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        </SpeedDial>
      )}
    </Fragment>
  );
}

export default UserOptions;
