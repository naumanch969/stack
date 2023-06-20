import folderReducer from "./folder";

// here posts is the state of reducers ---- as describe in any reducer function
import { combineReducers } from "redux";

export default combineReducers({
    folder: folderReducer,
})

// there may be multiple reducers
