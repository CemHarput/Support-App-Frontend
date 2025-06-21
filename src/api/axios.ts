/* import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: process.env.REACT_APP_API_API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

export default api; */

import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
