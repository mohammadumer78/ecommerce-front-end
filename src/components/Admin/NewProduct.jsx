import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {useNavigate} from "react-router-dom"

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { createInventory } from "../../actions/admin-actions";

import "./newProduct.css";

const NewProduct = () => {

  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [stock, setStock] = useState(0);

  const [images, setImages] = useState([]);

  const [imagePreview, setImagePreview] = useState([]);

  function imageHandler(e) {
    const files = Array.from(e.target.files);

    setImagePreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagePreview((old) => {
            return [...old, reader.result];
          });
          setImages((old) => {
            return [...old, reader.result];
          });
        }
      };
    });
  }

  function SubmitHandler(e) {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("stock", stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createInventory(myForm));
    alert.success("Added successfully !!");
    navigate("/admin/dashboard");
  }

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Toys",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            onSubmit={SubmitHandler}
            className="createProductForm"
            encType="multipart/form-data"
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                cols="30"
                rows="1"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">Choose Category</option>

                {categories.map((item) => {
                  return <option>{item}</option>;
                })}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={imageHandler}
              />
            </div>

            <div id="createProductFormImage">
              {imagePreview.map((image) => {
                return <img alt="Product Preview" src={image} />;
              })}
            </div>

            <Button id="createProductBtn" type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
