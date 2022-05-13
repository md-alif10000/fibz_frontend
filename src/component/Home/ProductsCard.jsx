import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "./ProductCard";
import ProductCard2 from "./ProductCard2";
const ProductsCard = ({ items, title, to, children }) => {
  return (
    <div className="productsCard">
      <div className="heading">
        <p className="medium-heading gray">{title} </p>
        <Link to={to} className="btn btn-primary">
          View More
        </Link>
      </div>

      <div className="products">
        {items && items.length > 0
          ? items.map((product) => (
              <ProductCard2 key={product._id} product={product} />
            ))
          : children}
      </div>
    </div>
  );
};

export default ProductsCard;
