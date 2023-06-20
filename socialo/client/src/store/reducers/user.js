import Cookie from 'js-cookie'
import {
    GET_ALL_USERS,
    SEND_OTP,
    CHANGE_PASSWORD,
    REGISTER,
    LOGIN,
    LOGOUT,
    REMOVE_ACCOUNT,

    SEND_FRIEND_REQUEST,
    ACCEPT_FRIEND_REQUEST,

    START_LOADING,
    END_LOADING,
    ERROR
} from "../constants"

const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const userReducers = (state = initialState, action) => {

    switch (action.type) {

        case GET_ALL_USERS:
            return { ...state, result: action.payload.result, isError: false, error: '' }

        case SEND_OTP:
            return { ...state, isError: false, error: '' }
        case REGISTER:
            return { ...state, result: [...state.result, action.payload.result] }

        case LOGIN:
        case CHANGE_PASSWORD:
        case REMOVE_ACCOUNT:
            return { ...state, result: state.result.map((user) => user._id == action.payload.result._id ? action.payload.result : user) }

        case SEND_FRIEND_REQUEST: {
            let result;
            result = state.result.map(user => user._id == action.payload.result.sender._id ? action.payload.result.sender : user)
            result = state.result.map(user => user._id == action.payload.result.receiver._id ? action.payload.result.receiver : user)
            return { ...state, result }
        }
        case ACCEPT_FRIEND_REQUEST: {
            let result;
            result = state.result.map(user => user._id == action.payload.result.sender._id ? action.payload.result.sender : user)
            result = state.result.map(user => user._id == action.payload.result.accepter._id ? action.payload.result.accepter : user)
            return { ...state, result }
        }



        case START_LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false
            }

        case END_LOADING:
            return {
                ...state,
                isLoading: false,
                isError: false
            }

        case ERROR:
            return {
                ...state,
                isError: true,
                error: action.payload.error
            }

        default:
            return state;
    }

}

export default userReducers