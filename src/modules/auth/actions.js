import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

import { isJson } from "../../library";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUserAction = ({ user, token, tokenExp }) => {
  // TODO: refactor Cookie into service?
  Cookies.set("AUTH_TOKEN", token, { secure: true });
  Cookies.set("USER", JSON.stringify(user), { secure: true });
  return {
    type: LOGIN_USER,
    payload: { user, token, tokenExp },
  };
};

export const logoutUserAction = () => {
  Cookies.remove("AUTH_TOKEN");
  Cookies.remove("USER");
  return {
    type: LOGOUT_USER,
  };
};

export const loginUserFromStorage = () => {
  const token = Cookies.get("AUTH_TOKEN");
  const userJson = Cookies.get("USER");
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
