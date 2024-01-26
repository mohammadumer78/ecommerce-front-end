import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {useNavigate} from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { getSingleProduct } from "../../actions/admin-actions";
import { editSingleProduct } from "../../actions/admin-actions";
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";

function EditProduct() {

  const dispatch = useDispatch();

  const id = useParams().id;

  const alert = useAlert();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [stock, setStock] = useState(0);

  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);

  const [newImages, setNewImages] = useState("");

  const { product } = useSelector((state) => {
    return state.edit;
  });

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setNewImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setNewImages((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  function submitHandler(e) {
    e.preventDefault();
     const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);

    if(images.length !== 0){
      
      images.map((image)=>{formData.append("images", image);});

    }


    dispatch(editSingleProduct(id, formData));
    alert.success("Updated succesfull!!!");
    navigate("/admin/dashboard");
  }

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
  }, [product]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch]);

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
            onSubmit={submitHandler}
            className="createProductForm"
            encType="multipart/form-data"
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
                placeholder="Price"
                required
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                value={description}
                placeholder="Product Description"
                cols="30"
                rows="1"
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
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                type="number"
                placeholder="Stock"
                required
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                onChange={updateProductImagesChange}
                name="avatar"
                accept="image/*"
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((item) => {
                  return <img alt="Old Product Preview" src={item.url} />;
                })}
            </div>

            <div id="createProductFormImage">
              {newImages &&
                newImages.map((item) => {
                  return <img alt="Old Product Preview" src={item} />;
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
}

export default EditProduct;
