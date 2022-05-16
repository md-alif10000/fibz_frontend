import React, { useRef, useState } from "react";

import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./TopCategories.css";

export default function TopCategories() {
  const { categories } = useSelector((state) => state.categories);
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  return (
    <>
      <div className="topCategories">
        <h1 className="heading">Top Categories</h1>
        <div className="caurosel">
          <Carousel breakPoints={breakPoints}>
            {categories.map((category, index) => (
              <Link to={"/products"} className="topCategory">
                <div className="imageContainer">
                  <img src={category?.image?.url} alt="" />
                </div>
                <div className="title">{category.name}</div>
              </Link>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
