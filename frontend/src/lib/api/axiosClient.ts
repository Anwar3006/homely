import axios from "axios";

const API_VERSION = "v1";

const axiosClient = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${API_VERSION}` ||
    `http://localhost:5050/api/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
