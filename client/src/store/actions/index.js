import { LOGIN_USER, LOGOUT_USER } from "../action-types";

export const loginUserAction = ({ user, token, tokenExp }) => {
  return {
    type: LOGIN_USER,
    payload: { user, token, tokenExp },
  };
};

export const logoutUserAction = () => {
  return {
    type: LOGOUT_USER,
  };
};
