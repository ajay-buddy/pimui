import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/",
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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error.status === 401)
    if (error && error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
  }
);

export default instance;
