import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import webFont from "webfontloader";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/product";
import Products from "./components/Product/products";
import Search from "./components/Search/Search.jsx";
import Login from "./components/User/Authentication.jsx";
import Account from "./components/User/Account.jsx";
import UserOptions from "./components/User/User-options.jsx";
import UpdatePassword from "./components/User/Update-password.jsx";
import ForgetPassword from "./components/User/Forget-password.jsx";
import UpdateProfile from "./components/User/Update-profile.jsx";
import MyOrders from "./components/Orders/MyOrders.jsx";
import ResetPassword from "./components/User/Reset-password.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import OrderSuccess from "./components/cart/OrderSuccess.jsx";
import Payment from "./components/cart/Payment.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import Cart from "./components/cart/cart.jsx";
import OrderDetails from "./components/Orders/OrderDetails.jsx";
import AdminDashBoard from "./components/Admin/AdminDashBoard.jsx";
import ProductList from "./components/Admin/ProductsList.jsx";
import EditProduct from "./components/Admin/EditProduct.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
import EditOrder from "./components/Admin/EditOrder.jsx";
import AdminUsers from "./components/Admin/AdminUsers.jsx";
import UpdateUser from "./components/Admin/UpdateUser.jsx";
import AdminReviews from "./components/Admin/AdminReviews.jsx";
import NotFound from "../../frontend/src/components/layout/NotFound.js";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";

function App() {
  const [publisherKey, setPublisherKey] = useState("");

  async function stripePublisherKey() {
    const response = await fetch(
      "http://localhost:5000/api/payment/publisherkey",
      { credentials: "include" }
    );

    const responseData = await response.json();

    setPublisherKey(responseData.publisherKey);
  }

  // USERS HOOK IS UNIVERSAL HOOK THATS WHY WE WILL CALL IT IN APP

  const { isAuthenticated, currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    // LOAD FONTS

    webFont.load({ google: { families: ["Roboto", "Lucida Sans"] } });

    stripePublisherKey();
  }, [isAuthenticated]);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      {/* HEADER BAR */}

      <Header />

      {isAuthenticated && <UserOptions currentUser={currentUser} />}

      <Routes>
        {/* UN PROCTED ROUTES */}

        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/products/:keyword" Component={Products} />
        <Route exact path="/search" Component={Search} />
        <Route exact path="/login" Component={Login} />
        <Route
          exact
          path="/password/forgetpassword"
          Component={ForgetPassword}
        />
        <Route
          exact
          path="/password/resetpassword/:token"
          Component={ResetPassword}
        />
        <Route exact path="/cart" Component={Cart} />

        {/* PROTECTED ROUTES */}

        {isAuthenticated && <Route exact path="/account" Component={Account} />}
        {isAuthenticated && (
          <Route exact path="/updateprofile" Component={UpdateProfile} />
        )}
        {isAuthenticated && (
          <Route exact path="/updatepassword" Component={UpdatePassword} />
        )}
        {isAuthenticated && (
          <Route exact path="/shipping" Component={Shipping} />
        )}

        {isAuthenticated && (
          <Route exact path="/confirmorder" Component={ConfirmOrder} />
        )}
        {isAuthenticated && (
          <Route exact path="/order/success" Component={OrderSuccess} />
        )}

        {isAuthenticated && (
          <Route
            exact
            path="/payment"
            element={
              <Elements stripe={loadStripe(publisherKey)}>
                <Payment />
              </Elements>
            }
          />
        )}

        {isAuthenticated && (
          <Route exact path="/myorders" Component={MyOrders} />
        )}
        {isAuthenticated && (
          <Route exact path="/order/:id" Component={OrderDetails} />
        )}

        {/* ADMIN ROUTES */}

     
        {isAuthenticated && currentUser && currentUser.role =="admin" && <Route exact path="/admin/dashboard" Component={AdminDashBoard} />}  
       
        {isAuthenticated && currentUser &&  currentUser.role =="admin" && <Route exact path="/admin/products" Component={ProductList} />}

        {isAuthenticated && currentUser && currentUser.role =="admin" &&   <Route exact path="/admin/product" Component={NewProduct} />}

        {isAuthenticated && currentUser && currentUser.role =="admin" &&    <Route exact path="/admin/edit/:id" Component={EditProduct} />}

        {isAuthenticated && currentUser && currentUser.role =="admin" &&   <Route exact path="/admin/orders" Component={OrderList} />}

        {isAuthenticated && currentUser && currentUser.role =="admin" &&   <Route exact path="/admin/order/:id" Component={EditOrder} />}

        {isAuthenticated && currentUser && currentUser.role =="admin" &&   <Route exact path="/admin/users" Component={AdminUsers} />}

        {isAuthenticated && currentUser && currentUser.role =="admin" &&   <Route exact path="/admin/user/:id" Component={UpdateUser} />}

        {isAuthenticated && currentUser && currentUser.role =="admin" &&   <Route exact path="/admin/reviews" Component={AdminReviews} />}

        <Route exact path="/notfound" Component={NotFound} />

        {/* DEFAULT URL FOR V6 */}

        <Route path="*" element={<Navigate to="/notfound" />} />
        

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
