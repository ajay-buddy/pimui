export const accessToken = localStorage.getItem("accessToken");

export const saveAccessToken = (token) =>
  localStorage.setItem("accessToken", token);

export const removeAccessToken = () => localStorage.removeItem("accessToken");
