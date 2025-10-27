import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
