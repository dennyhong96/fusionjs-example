import { combineReducers } from "redux";

import { staticReducer } from "../../library/common/slices";
import { authReducer } from "../../modules/auth";

export const rootReducer = combineReducers({
  auth: authReducer,
  static: staticReducer,
});
