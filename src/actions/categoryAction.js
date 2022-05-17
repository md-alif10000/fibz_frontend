import { toast } from "react-toastify";
import {
  CREATE_SECTION_FAILURE,
  CREATE_SECTION_REQUEST,
  CREATE_SECTION_SUCCESS,
  DELETE_SECTION_FAILURE,
  DELETE_SECTION_REQUEST,
  DELETE_SECTION_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_SECTIONS_FAILURE,
  GET_SECTIONS_REQUEST,
  GET_SECTIONS_SUCCESS,
} from "../constants/categoryConstants";
import axios, { backend_api } from "../utils/backend_api";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    const { data } = await axios.get(
      `${backend_api}/api/v1/category`,

      config
    );

    dispatch({ type: GET_CATEGORY_SUCCESS, payload: data.categories });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_CATEGORY_FAILURE,
      payload: error?.response?.data.message,
    });
  }
};

export const getSections = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SECTIONS_REQUEST });

    const { data } = await axios.get(`${backend_api}/api/v1/section`);

    dispatch({ type: GET_SECTIONS_SUCCESS, payload: data.sections });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_SECTIONS_FAILURE,
      payload: error?.response?.data.message,
    });
  }
};

export const getSectionscategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SECTIONS_REQUEST });

    const { data } = await axios.get(
      `${backend_api}/api/v1/sections_categories`
    );

    dispatch({ type: GET_SECTIONS_SUCCESS, payload: data.sectionsCategories });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_SECTIONS_FAILURE,
      payload: error?.response?.data.message,
    });
  }
};

export const createSection = (sectionData) => async (dispatch) => {
  console.log("In action");
  try {
    dispatch({ type: CREATE_SECTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${backend_api}/api/v1/admin/section`,
      sectionData,
      config
    );

    dispatch({
      type: CREATE_SECTION_SUCCESS,
      payload: data,
    });
    toast.success("Successfully Added New Section");
  } catch (error) {
    dispatch({
      type: CREATE_SECTION_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const createCategory = (sectionData) => async (dispatch) => {
  console.log("In action");
  try {
    dispatch({ type: CREATE_SECTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${backend_api}/api/v1/admin/category`,
      sectionData,
      config
    );

    dispatch({
      type: CREATE_SECTION_SUCCESS,
      payload: data,
    });
    toast.success("Successfully Added New Section");
  } catch (error) {
    dispatch({
      type: CREATE_SECTION_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const deleteSection = (id) => async (dispatch) => {
  console.log("In action");
  try {
    dispatch({ type: DELETE_SECTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.delete(
      `${backend_api}/api/v1/admin/section/${id}`
    );

    dispatch({
      type: DELETE_SECTION_SUCCESS,
    });
    toast.success("Successfully Deleted");

    getSections();
    getCategories();
  } catch (error) {
    dispatch({
      type: DELETE_SECTION_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SECTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.delete(
      `${backend_api}/api/v1/admin/category/${id}`
    );

    dispatch({
      type: DELETE_SECTION_SUCCESS,
    });
    toast.success("Successfully Deleted");
    getCategories();
  } catch (error) {
    dispatch({
      type: DELETE_SECTION_FAILURE,
      payload: error.response.data.message,
    });
  }
};
