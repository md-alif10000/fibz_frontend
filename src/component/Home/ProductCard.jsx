import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = () => {
  return (
    <div className="product_card">
      <div className="top"></div>
      <div className="bottom">
        <span></span>
        <p className="title"></p>
        <div>
          <span className="price">$14124</span>
          <div className="actions">
            <Link className="border_bottom">Select options</Link>
            <span className="border_bottom">Quick view</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
