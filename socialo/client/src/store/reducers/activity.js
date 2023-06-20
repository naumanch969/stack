import {
    GET_ACTIVITY,
    GET_USER_ACTIVITIES,
    GET_ACTIVITIES,

    CREATE_ACTIVITY,

    UPDATE_ACTIVITY,
    ADD_LINK,
    UPDATE_LINK,
    DELETE_LINK,
    UPDATE_HEADING,
    ADD_IMAGE,
    DELETE_IMAGE,
    UPDATE_TEXT,
    UPDATE_BG,

    DELETE_ACTIVITY,

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

const activityReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_ACTIVITY:
            return { ...state, note: action.payload }

        case GET_ACTIVITIES:
            return {
                ...state,
                result: action.payload.result.reverse()
            }

        case GET_USER_ACTIVITIES:
            return {
                ...state,
                result: action.payload.result.reverse()
            }

        case CREATE_ACTIVITY:
            return {
                ...state,
                result: [...state.result, action.payload.result]
            }

        case UPDATE_ACTIVITY:
        case UPDATE_BG:
        case ADD_LINK:
        case UPDATE_LINK:
        case DELETE_LINK:
        case UPDATE_HEADING:
        case ADD_IMAGE:
        case DELETE_IMAGE:
        case UPDATE_TEXT:
            return {
                ...state,
                result: state.result.map((note) => note._id == action.payload.result._id ? action.payload.result : note)
            }

        case DELETE_ACTIVITY:
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

export default activityReducer