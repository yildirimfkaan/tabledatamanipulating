import { combineReducers } from "redux";
import usersReducers from "./reducer";
import campaignsReducers from "./reducer";

const rootReducer = combineReducers({
  data: usersReducers,campaignsReducers,
});

export default rootReducer;
