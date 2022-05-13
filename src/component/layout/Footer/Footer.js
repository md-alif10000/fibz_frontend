import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <img src="https://res.cloudinary.com/mr-marvel/image/upload/v1652368687/layouts/2-FIBZ-removebg-preview_wsufdk.png" />
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; Mr Marvel</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="">Instagram</a>
        <a href="">Youtube</a>
        <a href="">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
