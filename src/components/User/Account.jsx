import React, { useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { loadUser } from "../../actions/users-actions";
import "./Account.css";
const Account = () => {
  
  const { currentUser, loading, isAuthenticated } = useSelector((state) => state.users);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {currentUser && (
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={currentUser.avatar.url} alt={currentUser.name} />
                <Link to={"/updateprofile"}>Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{currentUser.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{currentUser.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{currentUser.createdAt.substring(0, 10)}</p>
                </div>

                <div>
                  <Link to="/myorders">My Orders</Link>
                  <Link to="/updatepassword">Change Password</Link>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Account;
