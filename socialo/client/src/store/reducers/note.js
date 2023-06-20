import {
    GET_NOTE,
    GET_USER_NOTES,
    GET_NOTES,
    CREATE_NOTE,
    UPDATE_NOTE,
    BOOKMARK_NOTE,
    DELETE_NOTE,
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

const noteReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_NOTE:
            return { ...state, note: action.payload }

        case GET_NOTES:
            return {
                ...state,
                result: action.payload.result.reverse()
            }

        case CREATE_NOTE:
            return {
                ...state,
                result: [...state.result, action.payload.result]
            }

        case UPDATE_NOTE:
        case BOOKMARK_NOTE:
            return {
                ...state,
                result: state.result.map((note) => note._id == action.payload.result._id ? action.payload.result : note)
            }

        case DELETE_NOTE:
            return {
                ...state,
                result: state.result.filter((note) => note._id !== action.payload.result?._id)
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

export default noteReducer