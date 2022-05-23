import { LOGIN_USER, LOGOUT_USER } from "./actions";

export const initialAuthState = {
  user: null,
  token: null,
  tokenExp: null,
  isLoggedIn: false,
  isAuthChecked: false,
};

export function authReducer(state = initialAuthState, action) {
  // console.log({ state, action });
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
        isAuthChecked: true,
      };
    }
    case LOGOUT_USER: {
      return {
        ...initialAuthState,
        isAuthChecked: true,
      };
    }
    default: {
      return state;
    }
  }
}
