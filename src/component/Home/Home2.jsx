import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getSections,
  getSectionscategories,
} from "../../actions/categoryAction";
import { clearErrors, getProduct } from "../../actions/productAction";
import HomeSlider2 from "./HomeSlider2";
import ProductsCard from "./ProductsCard";
import Newsletter from "../layout/Newsletter/Newsletter";
import { Link } from "react-router-dom";
import TopCategories from "./TopCategories";

const Home2 = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { sections } = useSelector((state) => state.categories);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
    dispatch(getSections());
    dispatch(getSectionscategories());
  }, [dispatch, error]);

  return (
    <div>
      <div className="home_container">
        <HomeSlider2 />
        <TopCategories />

        <h1 className="sectionHeading">Our Collections</h1>
        <div className="sections">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={`products/${section._id}`}
              className="section"
              style={{ backgroundImage: `url(${section?.image?.url})` }}
            >
              <div>
                <p>{section.name}</p>

                <Link>View</Link>
              </div>
            </Link>
          ))}
        </div>

        <div>
          <ProductsCard title="Best Selling Products" items={products} />
        </div>
        <Newsletter />
      </div>
    </div>
  );
};

export default Home2;
