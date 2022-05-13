import React from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import "./Home.css";

const HomeSlider = ({ sections }) => {
  return (
    <div className="homeslider">
      <div className="categories">
        <div className="heading">Categories</div>
        <div className="items">
          {sections.map((section) => (
            <Link to={`products/${section._id}`}>
              <li>{section.name}</li>
            </Link>
          ))}
        </div>
      </div>
      <div className="slides">
        <Carousel autoPlay={true} navButtonsAlwaysVisible={true}>
          <img
            className="bannerImg"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/006/774/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg"
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

export default HomeSlider;
