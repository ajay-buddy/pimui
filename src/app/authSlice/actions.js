import { createAction } from "@reduxjs/toolkit";

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const ME = "ME";
export const LOGOUT = "LOGOUT";

export const loginAction = createAction(LOGIN);
export const registerAction = createAction(REGISTER);
export const meAction = createAction(ME);
export const logoutAction = createAction(LOGOUT);
