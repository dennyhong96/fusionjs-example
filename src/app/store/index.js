import { combineReducers } from "redux";

import { staticReducer, alertReducer } from "../../library/common/slices";
import { authReducer } from "../../modules/auth/slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  static: staticReducer,
  alert: alertReducer,
});
