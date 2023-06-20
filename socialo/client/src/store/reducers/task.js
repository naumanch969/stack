import {
    GET_TASK, GET_TASKS,
    GET_USER_TASKS,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
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

const taskReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_TASK:
            return { ...state, task: action.payload }

        case GET_TASKS:
            return {
                ...state,
                result: action.payload.result.reverse()
            }

        case CREATE_TASK:
            return {
                ...state,
                result: [...state.result, action.payload.result]
            }

        case UPDATE_TASK:
            return {
                ...state,
                result: state.result.map((task) => task._id == action.payload.result._id ? action.payload.result : task)
            }

        case DELETE_TASK:
            return {
                ...state,
                result: state.result.filter((task) => task._id !== action.payload.result?._id)
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

export default taskReducer
