import { setInitialAuthState } from "../../modules/auth/api";

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
