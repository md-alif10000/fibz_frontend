import React from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import "./Home2.css";

const HomeSlider2 = ({ sections }) => {
  return (
    <div className="home_slider">
      <div className="slides">
        <Carousel autoPlay={true} navButtonsAlwaysVisible={true}>
          <img
            className="bannerImg"
            src="https://res.cloudinary.com/mr-marvel/image/upload/v1652369841/layouts/1_FIBZ_fb_cover_ojm1ss.jpg"
            alt=""
          />

          <img
            className="bannerImg"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/216/694/small/shopping-trendy-banner-vector.jpg"
            alt=""
          />
          <img
            className="bannerImg"
            src="https://c8.alamy.com/comp/GJKD5R/online-shopping-banner-ecommerce-concept-GJKD5R.jpg"
            alt=""
          />
        </Carousel>
      </div>
    </div>
  );
};

export default HomeSlider2;
