import {createSlice} from '@reduxjs/toolkit'

const taskSlice = createSlice({
name:'task',
initialState:{
    isFetching:false,
    error:'',
    tasks:[],
    currentTask:null
},
reducers:{
    getTaskReducer:(state, action)=> {
        state.currentTask= action.payload 
    },
    getTaskReducers:(state, action)=>{
        state.tasks= action.payload.reverse()
    },
    createTaskReducer:(state, action)=>{
        state.tasks= [...state.tasks, action.payload]
    },
    updateTaskReducer:(state, action)=>{
        state.tasks= state.tasks.map((task) => task._id == action.payload._id ? action.payload : task)
    },
    deleteTaskReducer:(state, action)=>{
        state.tasks= state.tasks.filter((task) => task._id !== action.payload?._id)
    },
    start:(state)=>{
        state.isFetching = true
    },
    end:(state)=>{
        state.isFetching= false
    },
    error:(state, action)=>{
        state.error=action.payload
    },
}

})

export default taskSlice.reducer
export const {
    getTaskReducer,
    getTasksReducer,
    createTaskReducer,
    updateTaskReducer,
    deleteTaskReducer,
    start,
    end,
    error,
} = taskSlice.actions