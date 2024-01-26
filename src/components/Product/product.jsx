import React, { Fragment, useEffect, useState } from "react";

//PACKAGES FOR ROUTING

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

//PACKAGES FOR SLIDER

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

//PACKAGE FOR STARS

import ReactStars from "react-rating-stars-component";

//PACKAGE FOR CUSTOM USE

import { getProductDetails } from "../../actions/products-actions";

import Loader from "../loader/Loader";

import ErrorModal from "../error-modal/ErrorModal";

import ReviewCard from "./review-card";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";

import { addToCart } from "../../actions/cart-actions";

import {review} from "../../actions/products-actions";

//CSS FILES

import "./product-details.css";

function ProductDetails() {
  // ERROR MODAL HANDLER

  const [err, setError] = useState(false);

  let [quantity, setQuantity] = useState(1);

  const [open, setOpen] = useState(false);

  const [rating, setRating]= useState(0);

  const [comment, setComment]= useState("");

  // FRTCH CURRENT PRODUCT ID

  const params = useParams();

  // CALL GET PRODUCT DETAILS FUNCTION TO GET DATA FROM DB STORE
  // IN REDUX AND USE HERE

  const dispatch = useDispatch();

  const alert = useAlert();

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch]);

  // FETCH DATA FROM STORE STATES

  const { productDetails, loading, error } = useSelector(
    (state) => state.productDetails
  );

  // SETTINGS FOR SLIDER

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // SETTINGS FOR STARS

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 60 : 25,
    value: productDetails.ratings,
    isHalf: true,
  };

  // SET ERROR STATE DEPENDING UPON STORE ERROR STATE

  useEffect(() => {
    setError(error);
  }, [error]);

  function clearError() {
    setError(false);
  }

  function submitCart() {
    alert.success("Adedd to Cart, Successfully");
    dispatch(addToCart(params.id, quantity));
  }
  function decreaseHandler() {
    if (quantity == 1) return;
    setQuantity(quantity--);
  }

  function increaseHandler() {
    if (productDetails.stock <= quantity) return;
    setQuantity(quantity++);
  }

  function handleOpen(e)
  {
     open ? setOpen(false): setOpen(true)
  }

  function handleSubmit()
  {
    const data= {rating,comment,id:params.id};

    dispatch(review(data));

    window.location.reload(true);

    setOpen(false);
  }

  return (
    <Fragment>
      <ErrorModal error={err} onClear={clearError} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${productDetails.name} -- Ecommerce`} />
          <div className="ProductDetails">
            {/* SHOW SLIDER */}

            <div className="imgslider">
              <Slider {...settings} className="CarouselImage">
                {productDetails.images &&
                  productDetails.images.map(function (item, index) {
                    return (
                      <img
                        key={item.url}
                        src={item.url}
                        alt={`${index} Slide`}
                      />
                    );
                  })}
              </Slider>
            </div>

            {/* PRODUCT DETAILS BLOCK */}
            <div>
              <div className="detailsBlock-1">
                <h2>{productDetails.name}</h2>
                <p>Product#{productDetails._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({productDetails.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>Rs/{productDetails.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseHandler}>-</button>
                    <input type="number" value={quantity} />
                    <button onClick={increaseHandler}>+</button>
                  </div>
                  {productDetails.stock == 0 ? (
                    <button
                      disabled={true}
                      style={{
                        backgroundColor: "gray",
                        color: "white",
                        cursor: "not-allowed",
                        boxShadow: "0px 0px 10px 0px grey",
                      }}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button onClick={submitCart}>Add To Cart</button>
                  )}
                </div>
                <p>
                  Status:
                  <b
                    className={
                      productDetails.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {productDetails.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{productDetails.description}</p>
              </div>
              <button className="submitReview" onClick={handleOpen}>Submit Review</button>
            </div>
          </div>

          <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleOpen}>

            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating size="large" value={rating} onChange={(e)=>{setRating(e.target.value)}} />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e)=>{setComment(e.target.value)}}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleOpen}>Cancel</Button>
              <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>

          {/* IF PRODUCT HAS REVIEWS THEN SHOW REVIEWS ELSE SHOW NO REVIEWS */}

          {productDetails.reviews && productDetails.reviews[0] ? (
            <div className="reviews">
              {productDetails.reviews &&
                productDetails.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
