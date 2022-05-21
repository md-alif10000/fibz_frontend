import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Sections.css";

const Sections = () => {
  const { sections } = useSelector((state) => state.categories);

  return (
    <div className="sections-container" >
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
    </div>
  );
};

export default Sections;
