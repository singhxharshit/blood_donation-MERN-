// axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Make sure this matches your server
});

export default instance;
