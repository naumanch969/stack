import { configureStore, combineReducers } from '@reduxjs/toolkit'

import activityReducer from './reducers/activity'
import noteReducer from './reducers/note'
import postReducer from './reducers/post'
import taskReducer from './reducers/task'
import userReducer from './reducers/user'

const reducer = combineReducers({
    activity:activityReducer,
    note:noteReducer,
    post:postReducer,
    task:taskReducer,
    user:userReducer,
})

export const store = configureStore({
    reducer
})