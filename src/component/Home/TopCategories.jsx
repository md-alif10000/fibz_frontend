import React, { useRef, useState } from "react";

import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./TopCategories.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TopCategories() {
  const { categories } = useSelector((state) => state.categories);

  const [catref, inView] = useInView();

  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  return (
    <>
      <div className="topCategories">
        <h1 className="heading border-bottom">Top Categories</h1>
        <motion.div
          className="caurosel"
          ref={catref}
          animate={{
            scale: inView ? 1 : 0,
            opacity: inView ? 1 : 0,
            borderRadius: inView ? "0" : "20%",
          }}
          initial={{
            scale: 0.4,
            opacity: 0.2,
            borderRadius: "0",
          }}
          transition={{
            type:"spring",
            stiffness:150
          }}
        >
          <Carousel breakPoints={breakPoints}>
            {categories.map((category, index) => (
              <motion.Link
                key={index}
                to={`/products/${category.section}/${category._id}`}
                className="topCategory"
              >
                <div className="imageContainer">
                  <img src={category?.image?.url} alt="" />
                </div>
                <div className="title">{category.name}</div>
              </motion.Link>
            ))}
          </Carousel>
        </motion.div>
      </div>
    </>
  );
}
