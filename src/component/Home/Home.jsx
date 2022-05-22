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

import Sections from "./Sections";
import "./_home.css";
import Nav from "../layout/Navbar/Navbar";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { sections } = useSelector((state) => state.categories);

  const [heroRef, heroInView] = useInView();
  const [h1Ref, h1InView] = useInView();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
    dispatch(getSections());
    dispatch(getSectionscategories());
    dispatch(getCategories());
  }, [dispatch, error]);

  return (
    <div className="home">
      <div className="hero">
        <motion.div
          ref={heroRef}
          className="hero_container"
          animate={{
            animationDelay: 1.5,
            scale: heroInView ? 1 : 0.6,
            backgroundColor: heroInView ? "rgba(0, 0, 0, 0.473)" : "",
          }}
          initial={{
            backgroundColor: "none",
            scale: 0.6,
          }}
          transition={{
            duration: 1,
          }}
        >
          <Nav />
          <div className="content">
            <motion.h1
              ref={h1Ref}
              animate={{ y: 0 }}
              initial={{ y: "-500" }}
              transition={{ type: "spring", stiffness: "140", delay: 1 }}
            >
              WE deal only with premium .
            </motion.h1>
          </div>
        </motion.div>
      </div>

      <Sections />

      <TopCategories />
    </div>
  );
};

export default Home;
