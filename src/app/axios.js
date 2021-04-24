import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!config.headers["Authorization"]) {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
