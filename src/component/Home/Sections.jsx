import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Sections.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const Sections = () => {
  const { sections } = useSelector((state) => state.categories);
  const [sectionsRef, inView] = useInView();
  const [sectionView, sectionInView] = useInView();

  return (
    <div className="sections-container">
      <motion.div
        ref={sectionsRef}
        className="sections"
        animate={{
          x: inView ? "0" : "50vw",
        }}
        transition={{
          duration: 1,
        }}
      >
        {sections.map((section, index) => (
          <motion.div
            ref={sectionView}
            animate={{
              scale: sectionInView ? 1 : 0,
              opacity: sectionInView ? 1 : 0,
              animationDelay: 1.5,
              borderRadius: sectionInView ? "0" : "20%",
            }}
            initial={{
              scale:    0.4,
              opacity:  0.2,
              animationDelay: 1,
              borderRadius: "0" ,
            }}
            transition={{
              duration: 1,
              delay: 1,
            }}
            key={index}
            to={`products/${section._id}`}
            className="section"
            style={{ backgroundImage: `url(${section?.image?.url})` }}
          >
            <div>
              <p>{section.name}</p>

              <Link>View</Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Sections;
