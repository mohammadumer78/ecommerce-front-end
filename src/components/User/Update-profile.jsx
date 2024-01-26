import { React, Fragment, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {useNavigate} from "react-router-dom";

import FaceIcon from "@material-ui/icons/Face";

import MailOutlineIcon from "@material-ui/icons/MailOutline";

import Loader from "../loader/Loader";

import { updateUser } from "../../actions/users-actions";

import "./Update-profile.css";

function UpdateProfile() {

  const { currentUser } = useSelector((state) => state.users);

  const { isUpdated, loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState("./profile.png");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  useEffect(()=>{
    if(currentUser)
    {
        setEmail(currentUser.email);
        setName(currentUser.name);
        setAvatarPreview(currentUser.avatar.url);
    };

    if(isUpdated)
    {
      navigate("/account");
    }
    
  },[currentUser,isUpdated]);

  function nameHandler(event) {
    setName(event.target.value);
  }

  function emailHandler(event) {
    setEmail(event.target.value);
  }

  function handleAvatar(event)
  {
    const reader = new FileReader();

    reader.onload = () => {

      if (reader.readyState === 2) {

        setAvatarPreview(reader.result);

      }
    };

    reader.readAsDataURL(event.target.files[0]);

  }

  function updateProfileSubmit(e) {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatarPreview);
  
    dispatch(updateUser(myForm));
  }

  return (
    <Fragment>
    {loading ? <Loader /> : <Fragment>
    <div className="updateProfileContainer">
        <div className="updateProfileBox">
       
          <h2 className="updateProfileHeading">Update Profile</h2>
          {currentUser && (
            <form
              className="updateProfileForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateProfileName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  onChange={nameHandler}
                  value={name}
                />
              </div>
              <div className="updateProfileEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  onChange={emailHandler}
                  value={email}
                />
              </div>

              <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name="avatar" accept="image/*"  onChange={handleAvatar}/>
              </div>
              <input
                type="submit"
                value="Update"
                className="updateProfileBtn"
              />
            </form>
          )}
        </div>
      </div>
    </Fragment>}
      
    </Fragment>
  );
}

export default UpdateProfile;
