import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import "./TopCategories.css";

export default class SimpleSlider extends Component {
  render() {
    // const { categories } = useSelector((state) => state.categories);
    const categories = [];
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
    };
    return (
      <div className="topCategories">
        <h2> Multiple items </h2>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div className="topCategory">{category.name}</div>
          ))}

          <div className="topCategory">
            <h3>6</h3>
          </div>
          <div className="topCategory">
            <h3>7</h3>
          </div>
          <div className="topCategory">
            <h3>8</h3>
          </div>
          <div className="topCategory">
            <h3>9</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
