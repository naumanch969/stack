import Cookie from 'js-cookie'
import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice( {
    name:'user',
    initialState:{
        isFetching:false,
        error:'',
        users:[],
        currentUser:null,
        loggedUser:Cookie.get('profile') ? JSON.parse(Cookie.get('profile')) : null,
        accounts: Cookie.get('accounts') ? JSON.parse(Cookie.get('accounts')) : [],
    },
    reducers:{
        start:(state)=> {
            state.isFetching =true
        },
        end:(state)=> { 
            state.isFetching = false
        },
        error: (state, action)=>{
            state.error = action.payload
        },
        getAllUsersReducer:(state, action)=>  { 
            state.users = action.payload
        },
        sendOTPReducer:(state, action)=> {
             return state
        },
        registerReducer: (state, action)=>{
            state.users = [...state.users, action.payload]
        },
        loginReducer:(state, action)=>{
            state.users = state.users.map((user) => user._id == action.payload.users._id ? action.payload.users : user)
        },
        changePasswordReducer:(state, action)=>{ 
             state.users = state.users.map((user) => user._id == action.payload.users._id ? action.payload.users : user) 
        },
        removeAccountReducer:(state, action)=> { 
             state.users = state.users.map((user) => user._id == action.payload.users._id ? action.payload.users : user) 
        },
        sendFriendRequestReducer:(state, action)=> {
            state.users = state.users.map(user => user._id == action.payload.sender._id ? action.payload.sender : user)
            state.users = state.usres.map(user => user._id == action.payload.receiver._id ? action.payload.receiver : user)
        },
        acceptFriendRequestReducer: (state, action)=> {
            state.users = state.users.map(user => user._id == action.payload.sender._id ? action.payload.sender : user)
            state.users = state.users.map(user => user._id == action.payload.accepter._id ? action.payload.accepter : user)
        },
    }

})

export default userSlice.reducer
export const {
    start,
    end,
    error,
    getAllUsersReducer,
    sendOTPReducer,
    registerReducer,
    loginReducer,
    changePasswordReducer,
    removeAccountReducer,
    sendFriendRequestReducer,
    acceptFriendRequestReducer,
} = userSlice.actions