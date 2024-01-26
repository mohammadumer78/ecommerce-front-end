import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {useNavigate} from "react-router-dom";
import { updatePassword } from "../../actions/users-actions";
import Loader from "../loader/Loader";
import "./Update-password.css";
import { useDispatch, useSelector } from "react-redux";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, isUpdated } = useSelector((state) => state.profile);

  useEffect(()=>{
    if(isUpdated)
    {
      navigate("/account");
    }
  },[isUpdated]);


  function formSubmit(e) {
    e.preventDefault();
    const passwords = {
      oldpassword: oldPassword,
      newpassword: newPassword,
      confirmpassword: confirmPassword,
    };
    dispatch(updatePassword(passwords));
  }

  return (
    <Fragment>
      <MetaData title="Change Password" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form className="updatePasswordForm" onSubmit={formSubmit}>
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdatePassword;
