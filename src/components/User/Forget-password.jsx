import React, {Fragment, useEffect, useState} from "react";

import MailOutlineIcon from "@material-ui/icons/MailOutline";

import MetaData from "../layout/MetaData";

import Loader from "../loader/Loader"

import { forgetpassword  } from "../../actions/users-actions";

import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from "react-redux";

import "./Forget-password.css"; 

function ForgetPassword() {

    const[email, setEmail] = useState("");


    const alert = useAlert();

    const dispatch = useDispatch();

    const {loading, error, isUpdated}= useSelector((state)=>state.profile);

    function submitHandler(event){

        event.preventDefault();

        dispatch(forgetpassword(email));

    }

     function emailHnadler(event){

       setEmail(event.target.value);


     }

   useEffect(()=>{
    if(error)
    {
      alert.error(`Fail to send email !! ${error}`)
    }
    if(isUpdated)
    {
      alert.success("Email sent successfully!!")
    }
   },[error,isUpdated]);


  return (
    <Fragment>
    <MetaData title="Forgot Password" />
    {loading ? <Loader /> : <Fragment>
    <div className="forgotPasswordContainer">
   
      <div className="forgotPasswordBox">
        <h2 className="forgotPasswordHeading">Forgot Password</h2>

        <form
          className="forgotPasswordForm"
          onSubmit={submitHandler}
        >
          <div className="forgotPasswordEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={emailHnadler}
              
            />
          </div>

          <input
            type="submit"
            value="Send"
            className="forgotPasswordBtn"
          />
        </form>
      </div>
    </div>
    </Fragment>}
    
  </Fragment> )
}

export default ForgetPassword;