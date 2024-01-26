import React, { Fragment, useState } from "react";

import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import CheckoutSteps from "./CheckOutSteps.jsx";
import PhoneIcon from "@material-ui/icons/Phone";
import { Country, State } from "country-state-city";
import { shippingInfo } from "../../actions/cart-actions";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";

import "./Shipping.css";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";

function Shipping() {
  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [pincode, setPinCode] = useState("");

  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState("");

  const [state, setState] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function buttonHandler(e) {

    e.preventDefault();

    const data = {address, city, state, country, phone, pincode}

    dispatch(shippingInfo(data));


    navigate("/confirmorder");


  }

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0}/>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
           
          <form
            onSubmit={buttonHandler}
            className="shippingForm"
            encType="multipart/form-data"
          >
          
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pincode}
                onChange={(e) => {
                  setPinCode(e.target.value);
                }}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => {
                    return (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                >
                  <option value="">State</option>
                  {State && State.getStatesOfCountry(country).map((item) => <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  )}
                </select>
              </div>
            )}

            <input type="submit" value="Continue" className="shippingBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
