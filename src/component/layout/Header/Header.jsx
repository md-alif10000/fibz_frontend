import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories, getSections } from "../../../actions/categoryAction";
import "./Header.css";

const Header = () => {
  const { sections, categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSections());
  }, []);

  const menus = (sectionID) => {
    const _categories = categories.filter((cat) => cat.section == sectionID);

    return (
      <div className="megaMenu">
        <div className="categories">
          <h3>Categories</h3>
          {_categories.map((cat, index) => (
            <Link key={index}>{cat.name}</Link>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="header">
      <div className="top">
        <div className="left">
          <div className="contacts">
            <div className="contact">
              <span>Call US</span> <a href="tel:0130551151">+880 143154151</a>
            </div>
            <div className="contact">
              <span>Email</span>
              <a href="mailto:contact@fibz.com">contact@fibz.com</a>
            </div>
          </div>
        </div>
        <div className="center">
          <Link to={"/"} className="logo">
            <img
              src="https://res.cloudinary.com/mr-marvel/image/upload/v1652368687/layouts/2_FIBZ_profile_ig-removebg-preview_abdihd.png"
              alt=""
            />
          </Link>
        </div>
        <div className="right">
          <Link to="/cart">
            <AiOutlineShoppingCart />
            <span>Cart</span>
          </Link>
          <Link to="/account">
            <BiUserCircle />

            <span>Sign in</span>
          </Link>
        </div>
      </div>
      <div className="bottom">
        <div className="links">
          {sections.map((section) => (
            <Link to={"/"}>
              <span>{section.name}</span>
              {menus(section._id)}
            </Link>
          ))}
          <Link to={"/"}>
            <span>Home</span>
          </Link>
          <Link to={"/products"}>Shop</Link>
          <Link to={"/about"}>About Us</Link>
          <Link to={"/contact"}>Contuct Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
