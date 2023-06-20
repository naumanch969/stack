import { createSlice } from '@reduxjs/toolkit'

const activitySlice = createSlice({
    name:'activity',
    initialState:{
        isFetching:false,
        error:'',
        activities:[],
        currentActivity:null
    },
    reducers:{
        getActivityReducer:(state,action)=> { 
            state.currentActivity= action.payload 
        },
        getActivitiesReducer:(state,action)=> {
            state.activities= action.payload.reverse()
        },
        getUserActivitiesReducer:(state,action)=> {
            state.activities= action.payload.reverse()
        },
        createActivityReducer:(state,action)=> {
            state.activities= [...state.activities, action.payload]
        },
        updateActivityReducer:(state,action)=> {
            state.activities= state.activities.map((note) => note._id == action.payload._id ? action.payload : note)
        },
        deleteActivityReducer:(state,action)=> {
            state.activities= state.activities.filter((note) => note._id !== action.payload?._id)
        },
        start:(state)=> {
            state.isFetching = true
        },
        end:(state)=> {
            state.isFetching = false
        },
        error:(state,action)=>{
            state.error = action.payload
        },    
    }
})

export default activitySlice.reducer
export const {
    getActivityReducer,
    getActivitiesReducer,
    getUserActivitiesReducer,
    createActivityReducer,
    updateActivityReducer,
    deleteActivityReducer,
    start,
    end,
    error,
 } = activitySlice.actions