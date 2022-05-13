import axios from "axios";
import store from "../store";
// import { authConstants } from "../actions/constants";
import Cookies from "js-cookie";

// const token = window.localStorage.getItem("token");
export const backend_api = "https://mrmarvel.herokuapp.com";
// export const backend_api = "http://localhost:4000";
const token = Cookies.get("token");

console.log(token);

const axiosIntance = axios.create({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    token,
  },
});

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (token) {
    // req.headers.Authorization = `Bearer ${auth.token}`;
    // req.cookies?.token = token;
  }
  return req;
});

axiosIntance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      //   store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosIntance;
