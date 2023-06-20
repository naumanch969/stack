import {
    GET_FOLDERS,
    CREATE_FOLDER,
    CREATE_SUB_FOLDER,
    UPDATE_FOLDER,
    UPDATE_SUB_FOLDER,
    DELETE_FOLDER,
    CREATE_FILE,
    UPDATE_FILE,
    DELETE_FILE,
    DELETE_SUB_FOLDER,
} from "../constants/index"

const initialState = {
    folders: [],
    isLoading: false,
    isError: false
}

const folderReducer = (state = initialState, action) => {

    switch (action.type) {



        case GET_FOLDERS:
            return {        // we always have to spread state whenever we deals with object (particulary in actions of redux)
                ...state,
                folders: action.payload.result,
            }
        case CREATE_FOLDER:
            return {
                ...state,
                folders: [...state.folders, action.payload.result]
            }
        case UPDATE_FOLDER:
            return {
                ...state,
                folders: state.folders.map((folder) => folder._id == action.payload.result._id ? action.payload.result : folder)
            }
        case DELETE_FOLDER:
            return {
                ...state,
                folders: state.folders.filter((folder) => folder._id !== action.payload.result?._id)
            }



        case CREATE_SUB_FOLDER:
            return {
                ...state,
                folders: state.folders.map((folder) => folder._id == action.payload.result._id ? action.payload.result : folder)
            }
        case UPDATE_SUB_FOLDER:
            return {
                ...state,
                folders: state.folders.map((folder) => folder._id == action.payload.result._id ? action.payload.result : folder)
            }
        case DELETE_SUB_FOLDER:
            return {
                ...state,
                folders: state.folders.map((folder) => folder._id == action.payload.result._id ? action.payload.result : folder)
            }



        case CREATE_FILE:
            return {
                ...state,
                folders: state.folders.map((folder) => folder._id == action.payload.result._id ? action.payload.result : folder)
            }
        case UPDATE_FILE:
            return {
                ...state,
                folders: state.folders.map((folder) => folder._id == action.payload.result._id ? action.payload.result : folder)
            }
        case DELETE_FILE:
            return {
                ...state,
                folders: state.folders.map((folder) => folder._id == action.payload.result._id ? action.payload.result : folder)
            }
        default:
            return state;
    }
}

export default folderReducer