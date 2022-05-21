import React from "react";
import { Link } from "react-router-dom";
import "./_navbar.css";
import { BiShoppingBag } from "react-icons/bi";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="nav_container">
        <div className="logo">
          <Link to={"/"}>
            <img
              src="https://res.cloudinary.com/mr-marvel/image/upload/v1653151013/layouts/DESIGN-02_fa3qri.webp"
              alt=""
            />
          </Link>
        </div>
        <div className="links">
          <Link to={"/"} className="border_bottom">
            Home
          </Link>
          <Link to={"/"} className="border_bottom">
            Shop
          </Link>
          <Link to={"/"} className="border_bottom">
            About US
          </Link>
          <Link to={"/"} className="border_bottom">
            Contact US
          </Link>
        </div>
        <div className="actions">
          <Link to="/cart">
            <BiShoppingBag className="icon" />
          </Link>

          <Link to="/cart" className="box-border">
            {" "}
            <span>Account</span>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
