import * as api from "../api/index"
import {
    CREATE_FILE,
    UPDATE_FILE,
    DELETE_FILE,
    CREATE_SUB_FILE,
    UPDATE_SUB_FILE,
    DELETE_SUB_FILE
} from "../constants/index"



export const createFile = (fileData) => async (dispatch) => {
    try {
        const { data } = await api.createFile(fileData)
        console.log('data in createFile- action.js', data)
        dispatch({ type: CREATE_FILE, payload: data })
    } catch (error) {
        console.log("error in createFile - folder.js actions", error)
    }
}







export const createSubFile = (fileData) => async (dispatch) => {
    try {
        const { data } = await api.createSubFile(fileData)
        console.log('data in createSubFile- action.js', data)
        dispatch({ type: CREATE_SUB_FILE, payload: data })
    } catch (error) {
        console.log("error in createSubFile - folder.js actions", error)
    }
}







export const updateFile = (id, fileData) => async (dispatch) => {
    try {
        const { data } = await api.updateFile(id, fileData)
        console.log('data in updateFile- action.js', data)
        dispatch({ type: UPDATE_FILE, payload: data })
    } catch (error) {
        console.log("error in updateFile - folder.js actions", error)
    }
}






export const updateSubFile = (id, fileData) => async (dispatch) => {
    try {
        const { data } = await api.updateSubFile(id, fileData)
        console.log('data in updateSubFile- action.js', data)
        dispatch({ type: UPDATE_SUB_FILE, payload: data })
    } catch (error) {
        console.log("error in updateSubFile - folder.js actions", error)
    }
}





export const deleteFile = (id, fileData) => async (dispatch) => {
    try {
        const { data } = await api.deleteFile(id, fileData)
        console.log('data in deleteFile- action.js', data)
        dispatch({ type: DELETE_FILE, payload: data })
    } catch (error) {
        console.log("error in deleteFile - folder.js actions", error)
    }
}




export const deleteSubFile = (id, fileData) => async (dispatch) => {
    try {
        const { data } = await api.deleteSubFile(id, fileData)
        console.log('data in deleteSubFile- action.js', data)
        dispatch({ type: DELETE_SUB_FILE, payload: data })
    } catch (error) {
        console.log("error in deleteSubFile - folder.js actions", error)
    }
}