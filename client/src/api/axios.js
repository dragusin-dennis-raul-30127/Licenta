import axios from "axios";



const jwt = localStorage.getItem("token");

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  Authorization: `Bearer ${jwt}`,
  AccessControlAllowOrigin: "*",
};

const defaultConfig = {
  baseURL: "http://localhost:1337/",
  headers: defaultHeaders,
};

const getAxiosInstance = () => {
  return axios.create(defaultConfig);
};
export default getAxiosInstance;