import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Sections.css";
import { getCategories, getSections,createSection } from "../../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";

const Sections = () => {
  const dispatch = useDispatch();
  const [activeId, setactiveId] = useState("");

  const [sectionName, setsectionName] = useState("");
  const [sectionImage, setsectionImage] = useState(null);

  const { categories, sections } = useSelector((state) => state.categories);

  const addNewSection = (e) => {
    console.log(e);
    e.preventDefault();
    console.log("...................");

    try {
      const myForm = new FormData();
      myForm.set("name", sectionName);
      myForm.append("image", sectionImage);
      dispatch(createSection(myForm));
    } catch (error) {
      console.log(error);
    }
  };

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
          <form encType="multipart/form-data" onSubmit={addNewSection} >
            <div>
              <input
                type="text"
                placeholder="Enter Sections's Name"
                onChange={(e) => setsectionName(e.target.value)}
              />
              <input
                type="file"
                placeholder="Enter Sections's Name"
                onChange={(e) => setsectionImage(e.target.files[0])}
              />
            </div>

          <input type="submit" value={"Submit"} />
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
