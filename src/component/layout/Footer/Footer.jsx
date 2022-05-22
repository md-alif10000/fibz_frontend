import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="left">
        <div className="logo">
          <img
            src="https://res.cloudinary.com/mr-marvel/image/upload/v1653151013/layouts/DESIGN-01_pkjasi.webp"
            alt=""
          />
        </div>

        <div>
          <GoLocation /> <span> 17 Irving Pl, New York, NY 10003</span>
        </div>
        <div className="contacts">
          <div className="contact border_bottom">
            <BsTelephone /> <a  className="border_bottom" href="tel:01141414"> +01 14114114 </a>{" "}
          </div>
          <div className="contact  border_bottom">
            <FiMail /> <a className="border_bottom" href="tel:01141414"> +01 14114114 </a>{" "}
          </div>
        </div>
        <div className="socials">
          <Link to={"/"}>
            <BsFacebook className="socialIcon" />{" "}
          </Link>
          <Link to={"/"}>
            {" "}
            <BsInstagram className="socialIcon" />{" "}
          </Link>
        </div>
        <div className="copyright">
          <p>  &copy; Copyright 2022  <strong>FIBZ</strong> </p>
        </div>
      </div>
      <div className="right">
        <div className="newsletter">

          <h3>Subscribe To Our Newsletter</h3>
          <div className="inputBox">
            <input type="text" />
            <button>Join</button>
          </div>

        </div>
        <div className="linksContainer">
          <div className="links">
            <h3>SHOP</h3>
            <Link to="/" className="border_bottom" > Shop </Link>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
