import folderReducer from "./folder";
import userReducer from "./user";
import codeReducer from "./code";
import noteReducer from "./note";
import taskReducer from "./task";
import activityReducer from "./activity";

// here posts is the state of reducers ---- as describe in any reducer function
import { combineReducers } from "redux";

export default combineReducers({
    user: userReducer,
    folder: folderReducer,
    code: codeReducer,
    notes: noteReducer,
    task: taskReducer,
    activity: activityReducer
})

// there may be multiple reducers
