import {createSlice} from '@reduxjs/toolkit'

const postSlice = createSlice({
    name:'post',
    initialState:{
        isFetching:false,
        error:'',
        posts:[],
        currentPost:null
    },
    reducers:{
        getPostReducer: (state, action)=>{ 
            state.currentPost= action.payload 
        },
        getPostsReducer: (state, action)=>{ 
             state.posts= action.payload.reverse() 
        },
        createPostReducer: (state, action)=>{
            state.posts = [...state.posts, action.payload]
        },
        updatePostReducer: (state, action)=> {
             state.posts= state.posts.map((post) => post._id === action.payload._id ? action.payload : post) 
        },
        deletePostReducer:(state, action)=> {
            state.posts = state.posts.filter((post) => post._id !== action.payload?._id)
        },
        start:(state)=> {
            state.isFetching = true
        },
        end:(state)=>{   
            state.isFetching = false
        },
        error:(state,action)=> {
            state.error= action.payload 
        },
    }
})

export default postSlice.reducer
export const {
    getPostReducer,
    getPostsReducer,
    createPostReducer,
    updatePostReducer,
    deletePostReducer,
    start,
    end,
    error,
} = postSlice.actions