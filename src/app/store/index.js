import { combineReducers } from "redux";

import { authReducer } from "../../modules/auth";

export const rootReducer = combineReducers({
  auth: authReducer,
});
