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
            src="https://res.cloudinary.com/mr-marvel/image/upload/v1652710078/layouts/3_FIBZ_twitter_header_jgvbd2.jpg"
            alt=""
          />

          <img
            className="bannerImg"
            src="https://res.cloudinary.com/mr-marvel/image/upload/v1652710078/layouts/3_FIBZ_twitter_header_jgvbd2.jpg"
            alt=""
          />
        </Carousel>
      </div>
    </div>
  );
};

export default HomeSlider2;
