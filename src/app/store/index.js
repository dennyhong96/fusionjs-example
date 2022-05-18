import { combineReducers } from "redux";

import { authReducer } from "../../modules/auth";
import { staticReducer } from "../../library/common/reducers/static";

export const rootReducer = combineReducers({
  auth: authReducer,
  static: staticReducer,
});
