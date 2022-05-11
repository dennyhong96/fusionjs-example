import { combineReducers } from "redux";
import authReducer from "./auth";

const reducers = {
  auth: authReducer,
};

export default combineReducers(reducers);
