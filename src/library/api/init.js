import jwt from "jsonwebtoken";

import { isJson, parseCookie } from "../../library";

const setInitialAuthState = async (ctx) => {
  const state = {
    user: null,
    token: null,
    tokenExp: null,
    isLoggedIn: false,
    isAuthChecked: false,
  };
  const req = ctx.request;
  const { isAuthenticated, userId } = req.header;
  if (!isAuthenticated || !userId) return state;

  const { USER: userJson, AUTH_TOKEN: token } = parseCookie(req.header.cookie);
  if (!userJson || !isJson(userJson) || !token) return state;
  const user = JSON.parse(userJson);
  const decoded = jwt.decode(token);
  const tokenExp = new Date(decoded.exp * 1000).toISOString();
  return {
    ...state,
    user,
    token,
    tokenExp,
    isLoggedIn: true,
    isAuthChecked: true,
  };
};

const setIniitalStaticState = async (ctx) => {
  const state = {
    keys: {
      mapBox: process.env.MAPBOX_TOKEN,
    },
  };
  return state;
};

// Set initial redux state
export const setInitialState = async (ctx) => {
  return {
    auth: await setInitialAuthState(ctx),
    static: await setIniitalStaticState(ctx),
  };
};
