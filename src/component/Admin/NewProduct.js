import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { getSections } from "../../actions/categoryAction";
import { WithContext as ReactTags } from "react-tag-input";
import { toast } from "react-toastify";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { sections, categories } = useSelector((state) => state.categories);

  const [tags, setTags] = useState([]);
  const [colorCode, setcolorCode] = useState("");
  const [colorName, setcolorName] = useState("");
  const [colors, setColors] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [section, setSection] = useState(null);
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [filteredCategories, setfilteredCategories] = useState([]);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const onSectionSelect = (id) => {
    setSection(id);

    setfilteredCategories(categories.filter((cat) => cat.section == id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  useEffect(() => {
    dispatch(getSections());
  }, []);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("section", section);
    myForm.set("Stock", Stock);
    myForm.set("sizes", JSON.stringify(tags));
    myForm.set("colors", JSON.stringify(colors));

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    console.log("Before", tags);

    setTags([...tags, tag]);

    console.log("after", tags);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const addColor = () => {
    if (!colorName) {
      return toast.error("Enter color name");
    }
    if (!colorCode) {
      return toast.error("Enter color code");
    }
    setColors([...colors, { name: colorName, code: colorCode }]);

    setcolorName("");
    setcolorCode("");
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="tagsContainer">
              <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                placeholder="Enter sizes"
                autocomplete
                classNames={{
                  tags: "tagsClass",
                  tagInput: "tagInputClass",
                  tagInputField: "tagInputFieldClass",
                  selected: "selectedClass",
                  tag: "tag",
                  remove: "removeClass",
                  suggestions: "suggestionsClass",
                  activeSuggestion: "activeSuggestionClass",
                  editTagInput: "editTagInputClass",
                  editTagInputField: "editTagInputField",
                  clearAll: "clearAllClass",
                }}
              />
            </div>

            <div className="colorsContainer">
              <div className="colors">
                {colors.map((color, index) => (
                  <div key={index}>
                    <span style={{ backgroundColor: color.code }}> </span>{" "}
                    <span>{color.name}</span>{" "}
                  </div>
                ))}
              </div>
              <div className="colorInputs">
                <input
                  type={"color"}
                  onChange={(e) => setcolorCode(e.target.value)}
                  placeholder="Color"
                  value={colorCode}
                />
                <input
                  value={colorName}
                  type={"text"}
                  onChange={(e) => setcolorName(e.target.value)}
                  placeholder="color name"
                />
                <button onClick={() => addColor()}>Add Color</button>
              </div>
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => onSectionSelect(e.target.value)}>
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section._id} value={section._id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {filteredCategories.map((cate, index) => (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
