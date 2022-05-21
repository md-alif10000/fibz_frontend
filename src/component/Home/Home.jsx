import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCategories,
  getSections,
  getSectionscategories,
} from "../../actions/categoryAction";
import { clearErrors, getProduct } from "../../actions/productAction";
import TopCategories from "./TopCategories";

import NavBar from "../layout/Navbar/NavBar";
import Sections from "./Sections";
import "./_home.css";

const Home = () => {
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
    dispatch(getCategories())
  }, [dispatch, error]);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero_container">
          <NavBar />
          <div className="content">
            <h1>WE deal only with premium</h1>
          </div>
        </div>
      </div>

      <Sections />

      <TopCategories />
    </div>
  );
};

export default Home;
