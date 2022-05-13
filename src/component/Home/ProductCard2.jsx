import { Rating } from '@material-ui/lab';
import React from 'react'
import { Link } from 'react-router-dom'
import "./ProductCard2.css"

const ProductCard2 = ({product}) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link to={`product/${product._id}`} className='product_card' >
        <div className="card_container">
            <div className="image_container">
            <img src={product.images[0].url} alt={product.name} />

            </div>
            <div className="info_container">
                <p>{product.name}</p>
                <p className='price' >${product.price}</p>
                <Rating {...options}  style={{alignSelf:"left",fontSize:"14px"}} fontSize="10" />

            </div>

        </div>

    </Link>
  )
}

export default ProductCard2