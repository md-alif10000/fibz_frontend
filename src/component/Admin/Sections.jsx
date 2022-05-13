import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Sections.css";
import { getCategories, getSections } from "../../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";

const Sections = () => {
  const dispatch = useDispatch();
  const [activeId, setactiveId] = useState("");

  const { categories, sections } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getSections);
    dispatch(getCategories);
  }, []);

  const getSubItem = (id) => {
    const cats = categories.filter((cat) => cat.section == id);

    return (
      <>
        {cats.map((cat, index) => (
          <div className="subItem">{cat.name}</div>
        ))}
      </>
    );
  };

  return (
    <div className="sections_container">
      <Sidebar />
      <div className="content">
        <div className="form_container">
          <form action="">
            <div>
              <input type="text" placeholder="Enter Sections's Name" />
            </div>

            <button type="submit">Add Section</button>
          </form>
        </div>
        <div className="itemsContainer">
          {sections.map((section, index) => (
            <div
            key={index}
              className={` ${section._id == activeId ? "active item" : "item"}`}
              onClick={() => setactiveId(section._id)}
            >
              <span>{section.name}</span>
              {getSubItem(section._id)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sections;
