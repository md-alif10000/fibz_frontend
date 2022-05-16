import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Sections.css";
import {
  getCategories,
  getSections,
  createSection,
  deleteCategory,
  deleteSection,
} from "../../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";

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
      myForm.set("image", sectionImage);
      dispatch(createSection(myForm));
    } catch (error) {
      console.log(error);
    }
  };

  const fileChange = (e) => {
    if (e.target.name === "sectionImage") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // setAvatarPreview(reader.result);
          setsectionImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      // setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    dispatch(getSections);
    dispatch(getCategories);
  }, []);

  const categoryDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const sectionDelete = (id) => {
    dispatch(deleteSection(id));
    
  };

  const getSubItem = (id) => {
    const cats = categories.filter((cat) => cat.section == id);

    return (
      <>
        {cats.map((cat, index) => (
          <div className="subItem">
            <span>{cat.name} </span>{" "}
            <BsFillTrashFill
              className="deleteIcon"
              onClick={() => categoryDelete(cat._id)}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="sections_container">
      <Sidebar />
      <div className="content">
        <div className="form_container">
          <form encType="multipart/form-data" onSubmit={addNewSection}>
            <div>
              <input
                type="text"
                placeholder="Enter Sections's Name"
                onChange={(e) => setsectionName(e.target.value)}
              />
              <input
                type="file"
                name="sectionImage"
                placeholder="Enter Sections's Name"
                onChange={(e) => fileChange(e)}
              />
            </div>

            <input className="submit" type="submit" value={"Submit"} />
          </form>
        </div>
        <div className="itemsContainer">
          {sections.map((section, index) => (
            <div
              key={index}
              className={` ${section._id == activeId ? "active item" : "item"}`}
              onClick={() => setactiveId(section._id)}
            >
              <span>
                {section.name}{" "}
                <BsFillTrashFill
                  className="deleteIcon"
                  onClick={() => sectionDelete(section._id)}
                />{" "}
              </span>
              {getSubItem(section._id)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sections;
