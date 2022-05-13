import React from "react";
import { BiCart, BiHome } from "react-icons/bi";
import { BsPersonFill, BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import './navbar.css'
const BottomNav = () => {
  return (
    <div className="bottomNav">
      <div className="container">
        <Link to="/" >
          <div>
            <BiHome />
          </div>
        </Link>
        <Link to="/products" >
          <div>
            <BsShop />
          </div>
        </Link>
        <Link  to="/cart" >
          <div>
            <BiCart />
          </div>
        </Link>
        <Link to="/account" >
          <div>
            <BsPersonFill />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
