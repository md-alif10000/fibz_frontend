import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import {
  BsChevronDown,
  BsXLg,
  BsFillTelephoneFill,
  BsEnvelopeFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories, getSections } from "../../../actions/categoryAction";
import { Drawer } from "@material-ui/core";
import { BsGridFill } from "react-icons/bs";
import "./Header.css";

const Header = () => {
  const [drawerOpen, setdrawerOpen] = useState(false);
  const { sections, categories } = useSelector((state) => state.categories);

  const [selectedItem, setselectedItem] = useState(null);

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

  const getSubItems = (sectionID) => {
    const _categories = categories.filter((cat) => cat.section == sectionID);

    return (
      <div
        className={`${
          selectedItem == sectionID ? "subItems show" : "subItems"
        }`}
      >
        {_categories.map((cat, index) => (
          <Link
            to={"/products"}
            onClick={() => setdrawerOpen(false)}
            className="subItem"
            key={index}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    );
  };

  const toggle = (ID) => {
    console.log(ID);
    if (selectedItem == ID) {
      return setselectedItem(null);
    }
    setselectedItem(ID);
  };
  return (
    <div className="header">
      <div className="top">
        <div className="left">
          <div className="contacts">
            <div className="contact">
              <BsFillTelephoneFill className="icon" /> <span>Call US</span>{" "}
              <a href="tel:0130551151">+880 143154151</a>
            </div>
            <div className="contact">
              <BsEnvelopeFill className="icon" />
              <span>Email</span>
              <a href="mailto:contact@fibz.com">contact@fibz.com</a>
            </div>
          </div>
          <div className="menuIcon" onClick={() => setdrawerOpen(!drawerOpen)}>
            <BsGridFill />
          </div>
          <Drawer
            anchor={"left"}
            open={drawerOpen}
            onClose={() => setdrawerOpen(false)}
            onOpen={() => setdrawerOpen(true)}
          >
            <div className="drawerContainer">
              <div className="drawerClose">
                <BsXLg onClick={() => setdrawerOpen(false)} />
              </div>
              <div className="accordion">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedItem === section._id ? "item active" : "item"
                    }`}
                    onClick={() => toggle(section._id)}
                  >
                    <div className="itemTitle">
                      <span> {section.name}</span>
                      <BsChevronDown className="arrow" />
                    </div>
                    {getSubItems(section._id)}
                  </div>
                ))}
              </div>
            </div>
          </Drawer>
        </div>
        <div className="center">
          <Link to={"/"} className="logo">
            <img
              src="https://res.cloudinary.com/mr-marvel/image/upload/v1652720090/layouts/3_FIBZ_qml1bk.svg"
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
