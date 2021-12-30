export const accessToken = localStorage.getItem("accessToken");

export const saveAccessToken = (token, id) =>{
  localStorage.setItem("accessToken", token);
  localStorage.setItem("id", id);
}

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("id");
  return true;
};
