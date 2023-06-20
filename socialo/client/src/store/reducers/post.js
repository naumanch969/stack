import {
    GET_POSTS,
    CREATE_POST,
    LIKE_POST,
    COMMENT_POST,

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

const postReducers = (state = initialState, action) => {

    switch (action.type) {

        case GET_POSTS: return { ...state, result: action.payload.result.reverse() }
        case CREATE_POST:
        case LIKE_POST: return { ...state, result: state.result.map((post) => post._id === action.payload._id ? action.payload : post) }


        case START_LOADING:
            return { ...state, isLoading: true, isError: false }
        case END_LOADING:
            return { ...state, isLoading: false, isError: false }

        case ERROR:
            return { ...state, isError: true, error: action.payload.error }

        default:
            return state;
    }

}

export default postReducers