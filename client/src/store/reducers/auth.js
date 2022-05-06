import { LOGIN_USER, LOGOUT_USER } from "../action-types";

const initialState = {
  user: null,
  token: null,
  tokenExp: null,
  isLoggedIn: false,
};

export default function (state = initialState, action) {
  console.log({ state, action });
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER: {
      const { user, token, tokenExp } = payload;
      return {
        ...state,
        user,
        token,
        tokenExp,
        isLoggedIn: true,
      };
    }
    case LOGOUT_USER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
