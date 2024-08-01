import { combineReducers } from "redux";
import articleReducers from "./articleReducers";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  articleState: articleReducers,
  userState: userReducer,
});

export default rootReducer;
