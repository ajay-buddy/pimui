import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.111.54.78:3000/",
  // baseURL: "http://localhost:4000",
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
    if (error && error.response && error.response.status === 401) {
      localStorage.clear();
      if(window && window.location) {
        console.log("===>",window.location)
        window.location.href = "/";
      }
      
    }
  }
);

export default instance;



