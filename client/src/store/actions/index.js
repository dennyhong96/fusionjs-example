import { LOGIN_USER, LOGOUT_USER } from "../action-types";
import jwtDecode from "jwt-decode";

import { isJson } from "../../utils";

export const loginUserFromStorage = () => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const userJson = localStorage.getItem("USER");
  if (!token || !userJson || !isJson(userJson)) {
    return logoutUserAction();
  }
  let decoded;
  try {
    decoded = jwtDecode(token);
    if (!decoded || Date.now() >= decoded.exp * 1000) {
      return logoutUserAction();
    } // token expired
  } catch (error) {
    return logoutUserAction();
  }
  const user = JSON.parse(userJson);
  return loginUserAction({
    user,
    token,
    tokenExp: new Date(decoded.exp * 1000).toISOString(),
  });
};

export const loginUserAction = ({ user, token, tokenExp }) => {
  localStorage.setItem("AUTH_TOKEN", token);
  localStorage.setItem("USER", JSON.stringify(user));
  return {
    type: LOGIN_USER,
    payload: { user, token, tokenExp },
  };
};

export const logoutUserAction = () => {
  localStorage.removeItem("AUTH_TOKEN");
  localStorage.removeItem("USER");
  return {
    type: LOGOUT_USER,
  };
};
