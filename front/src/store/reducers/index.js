import { combineReducers } from "redux";

import auth from "./auth";
import campaign from "./campaign";
import loading from "./loading";
import request from "./request";

export default combineReducers({
  auth,
  campaign,
  loading,
  request
});
