import userReducer from "./user";
import noteReducer from "./note";
import taskReducer from "./task";
import activityReducer from "./activity";
import postReducers from "./post";

// here posts is the state of reducers ---- as describe in any reducer function
import { combineReducers } from "redux";

export default combineReducers({
    user: userReducer,
    notes: noteReducer,
    task: taskReducer,
    post: postReducers,
    activity: activityReducer
})

// there may be multiple reducers
