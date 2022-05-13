import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addItemsToCart } from "../../actions/cartAction";
import { BsCartPlus } from "react-icons/bs";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, 1));
    toast.success("Item Added To Cart");
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div>
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div>
      <Rating {...options}  style={{alignSelf:"center"}} />
      
        <p className="productTitle" >{product.name}</p>
        <div className="ratings">
         
        </div>
        <div className="prices" >
          <span className="price">{`₹${product.price}`}</span>
          <del className="prev-price">{`₹${product.price}`}</del>
        </div>
      </div>
      <div className="actions">
        <div onClick={addToCartHandler}>
          <BsCartPlus />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
