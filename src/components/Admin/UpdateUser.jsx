import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { updateUser } from "../../actions/admin-actions";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {

  const dispatch = useDispatch();

  const id = useParams().id;

  const navigate = useNavigate();


  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState();

  function submitHandler(e) {

    e.preventDefault();
    const data = { name, email, role };
    dispatch(updateUser(id, data));

    navigate("/admin/users");
    
  }

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form onSubmit={submitHandler} className="createProductForm">
            <h1>Update User</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
               
              />
            </div>

            <div>
              <VerifiedUserIcon />
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button id="createProductBtn" type="submit">
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateUser;
