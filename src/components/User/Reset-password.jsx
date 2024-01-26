import React, {Fragment, useState, useEffect} from 'react';

import LockOpenIcon from "@material-ui/icons/LockOpen";

import LockIcon from "@material-ui/icons/Lock";

import {useParams, useNavigate} from "react-router-dom";

import {useAlert} from "react-alert";

import MetaData from '../layout/MetaData';

import { resetpassword } from '../../actions/users-actions';

import { useDispatch,useSelector } from 'react-redux';

import  Loader from "../loader/Loader";

import "./Reset-password.css";


function ResetPassword() {

  const[newPassword, setNewPassword]=useState("");

  const[confirmPassword, setConfirmPassword]= useState("");

  const {loading, error, isUpdated} = useSelector((state)=>state.profile);

  const alert= useAlert();

  const navigate = useNavigate();

  const token = useParams().token;

   const dispatch = useDispatch();

   useEffect(()=>{
    if(isUpdated)
    {
     alert.success("Password is updated successfully !!!");
     navigate("/");
    }
    if(error)
    {
     alert.error(`Something went wrong !! ${error}`)
    }
   },[error,isUpdated])

   function handleForm(e){

    e.preventDefault();

    const passwords={password:newPassword, confirmPassword:confirmPassword}

    dispatch(resetpassword(passwords,token));


   }

  return (
    <Fragment>
    {loading ? <Loader /> : <Fragment>
    <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={handleForm}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(event)=>{setNewPassword(event.target.value)}}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(event)=>{setConfirmPassword(event.target.value)}}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
    </Fragment>}
          
        </Fragment>
  )
}

export default ResetPassword;