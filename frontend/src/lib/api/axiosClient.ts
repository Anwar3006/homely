import { fetchAuthSession } from "aws-amplify/auth";
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

// Request interceptor to add fresh token to every request
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};

      if (idToken) {
        config.headers.Authorization = `Bearer ${idToken}`;
      }
    } catch (error) {
      console.error("Error fetching auth session:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
