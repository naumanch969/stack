import { GET_CODE, GET_CODES, CREATE_CODE, UPDATE_CODE, COMMENT_CODE, LIKE_CODE, DELETE_CODE, START_LOADING, END_LOADING, ERROR } from "../constants/index"

const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const codeReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_CODE:
            return action.payload

        case GET_CODES:
            return {
                ...state,
                result: action.payload.result.reverse()
            }

        case CREATE_CODE:
            return {
                ...state,
                result: [...state.result, action.payload.result]
            }

        case UPDATE_CODE:
        case COMMENT_CODE:
        case LIKE_CODE:
            return {
                ...state,
                result: state.result.map((code) => code._id == action.payload.result._id ? action.payload.result : code)
            }

        case DELETE_CODE:
            return {
                ...state,
                result: state.result.filter((code) => code._id !== action.payload.result?._id)
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

export default codeReducer