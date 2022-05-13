import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShop,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiMenu, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { Drawer } from "@material-ui/core";
import {
  MdDashboard,
  MdOutlineAccountCircle,
  MdOutlineContactMail,
} from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { FcAbout } from "react-icons/fc";
import { logout } from "../../../actions/userAction";
import { toast } from "react-toastify";
const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [drawerOpen, setdrawerOpen] = useState(false);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (total, b) => total + b.price * b.quantity,
    0
  );

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  return (
    <div className="navbar">
      <div className="nav_top">
        <div className="container">
          <div>
            Contact Us : <a href="tel:+02 25632666623632">+02 25632666623632</a>{" "}
          </div>

          <div>
            Contact Us :{" "}
            <a href="mailto:mrmarvel@gmail.com">mrmarvel@gmail.com </a>{" "}
          </div>
        </div>
      </div>
      <div className="nav_center">
        <Drawer
          anchor={"left"}
          open={drawerOpen}
          onClose={() => setdrawerOpen(!drawerOpen)}
        >
          <div className="sidemenu">
            <div className="menuClose" onClick={() => setdrawerOpen(false)}>
              <AiOutlineClose />
            </div>
            <div className="top">
              <h2> Mr Marvel</h2>
              {isAuthenticated && (
                <div className="user">
                  <img src={user?.avatar.url} alt="" />
                  <h4>{user?.name}</h4>
                  <h5>{user?.email}</h5>
                </div>
              )}
            </div>
            <div className="center">
              <div className="menu">
                <Link to={"/"}>
                  <AiOutlineHome /> Home
                </Link>
                <Link to={"/products"}>
                  <AiOutlineShop /> Shop
                </Link>
                <Link to={"/about"}>
                  <FcAbout /> About Us
                </Link>
                <Link to={"/contact"}>
                  <MdOutlineContactMail /> Contuct Us
                </Link>
                <p>Users link</p>

                {isAuthenticated && (
                  <>
                    <Link to={"/account"}>
                      <MdOutlineAccountCircle /> Profile
                    </Link>
                    <Link to={"/orders"}>
                      <CgNotes /> Orders
                    </Link>
                    {user?.role === "admin" && (
                      <Link to={"/admin/dashboard"}>
                        <MdDashboard /> Dashboard
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="bottom"></div>
          </div>
        </Drawer>
        <div className="container">
          <div className="left">
            <div
              className="menuIcon"
              onClick={() => setdrawerOpen(!drawerOpen)}
            >
              <BiMenu />
            </div>
            <div className="logo">
              <Link to="/" >
              <img src="./images/logo2__bg.jpg" alt="" />
              </Link>
       
            </div>
          </div>
          <div className="center">
            <Link to={"/"}>
              <AiOutlineHome className="m-5" /> Home
            </Link>
            <Link to={"/products"}>Shop</Link>
            <Link to={"/about"}>About Us</Link>
            <Link to={"/contact"}>Contuct Us</Link>
          </div>
          <div className="right">
            <Link to="/cart">
              <div className="cartIcon">
                <div>
                  
                  <span>Cart</span> <span>${totalPrice}</span>{" "}
                </div>{" "}
                <span>{cartItems.length} </span>
                <AiOutlineShoppingCart />
              </div>
            </Link>
            <Link to="/account">
              {isAuthenticated ? (
                <img className="avatar" src={user?.avatar?.url} />
              ) : (
                <BiUserCircle />
              )}
            </Link>
            {!isAuthenticated ? (
              <Link to="/login">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>Login</span>

                  <AiOutlineLogin />
                </div>
              </Link>
            ) : (
              <Link to="">
                <div
                  onClick={logoutUser}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>Logout</span>

                  <AiOutlineLogin />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
