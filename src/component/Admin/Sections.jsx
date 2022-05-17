import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Sections.css";
import {
  getCategories,
  getSections,
  createSection,
  deleteCategory,
  deleteSection,
  createCategory,
} from "../../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const Sections = () => {
  const dispatch = useDispatch();
  const [activeId, setactiveId] = useState("");

  const [sectionName, setsectionName] = useState("");
  const [sectionImage, setsectionImage] = useState(null);

  const [sectionId, setsectionId] = useState(null);
  const [categoryName, setcategoryName] = useState("");
  const [categoryImage, setcategoryImage] = useState(null);

  const { categories, sections } = useSelector((state) => state.categories);

  const addNewSection = (e) => {
    e.preventDefault();

    if (!sectionName) {
      return toast.error("Section Name is required");
    }

    if (!sectionImage) {
      return toast.error("Please select an image");
    }

    try {
      const myForm = new FormData();
      myForm.set("name", sectionName);
      myForm.set("image", sectionImage);
      dispatch(createSection(myForm));
    } catch (error) {
      console.log(error);
    }
  };

  const addNewCategory = (e) => {
    console.log(e);
    e.preventDefault();
    if (!categoryName) {
      return toast.error("Category Name is required");
    }
    if (sectionId) {
      return toast.error("Please select section");
    }
    if (!categoryImage) {
      return toast.error("Please select an image");
    }

    try {
      const myForm = new FormData();
      myForm.set("name", categoryName);
      myForm.set("section", sectionId);
      myForm.set("image", categoryImage);
      dispatch(createCategory(myForm));
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
    } else if (e.target.name === "categoryImage") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // setAvatarPreview(reader.result);
          setcategoryImage(reader.result);
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
            <input className="submit" type="submit" value={"Add Section"} />
          </form>

          <form encType="multipart/form-data" onSubmit={addNewCategory}>
            <div>
              <input
                type="text"
                placeholder="Enter Category's Name"
                onChange={(e) => setcategoryName(e.target.value)}
              />
              <input
                type="file"
                name="categoryImage"
                placeholder="Enter Category Image"
                onChange={(e) => fileChange(e)}
              />
              <select
                name="sectionSelect"
                id=""
                onChange={(e) => setsectionId(e.target.value)}
              >
                {sections.map((section, index) => (
                  <option key={index} value={section._id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>

            <input className="submit" type="submit" value={"Add Category"} />
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
