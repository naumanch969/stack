import * as api from "../api/index"
import {
    GET_FOLDERS,
    CREATE_FOLDER,
    CREATE_SUB_FOLDER,
    UPDATE_FOLDER,
    UPDATE_SUB_FOLDER,
    DELETE_FOLDER,
    DELETE_SUB_FOLDER,
} from "../constants/index"




export const getFolders = () => async (dispatch) => {
    try {
        const { data } = await api.getFolders()
        console.log('data in getFolders - actions.js', data)
        dispatch({ type: GET_FOLDERS, payload: data })
    } catch (error) {
        console.log("error in getAllFolder - folder.js actions", error)
    }
}





export const createFolder = (folderData) => async (dispatch) => {
    // folderData - {parentFolder}
    try {
        const { data } = await api.createFolder(folderData)
        console.log('result in createFolder- action.js', data)
        dispatch({ type: CREATE_FOLDER, payload: data })
    } catch (error) {
        console.log("error in createFolder - folder.js actions", error)
    }
}






export const createSubFolder = (folderData) => async (dispatch) => {
    // folderData - {parentFolder,folderName}
    try {
        const { data } = await api.createSubFolder(folderData)
        console.log('result in createSubFolder- action.js', data)
        dispatch({ type: CREATE_SUB_FOLDER, payload: data })
    } catch (error) {
        console.log("error in createSubFolder - folder.js actions", error)
    }
}







export const updateFolder = (id, folderData) => async (dispatch) => {
    // folderData - {parentFolder}
    try {
        const { data } = await api.updateFolder(id, folderData)
        console.log('data in updateFolder- action.js', data)
        dispatch({ type: UPDATE_FOLDER, payload: data })
    } catch (error) {
        console.log("error in updateFolder - folder.js actions", error)
    }
}









export const updateSubFolder = (id, folderData) => async (dispatch) => {
    // folderData - {parentFolder, folderName}
    try {
        const { data } = await api.updateSubFolder(id, folderData)
        console.log('data in updateSubFolder- action.js', data)
        dispatch({ type: UPDATE_SUB_FOLDER, payload: data })
    } catch (error) {
        console.log("error in updateSubFolder - folder.js actions", error)
    }
}





export const deleteFolder = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteFolder(id)
        console.log('data in deleteFolder- action.js', data)
        dispatch({ type: DELETE_FOLDER, payload: data })
    } catch (error) {
        console.log("error in deleteFolder - folder.js actions", error)
    }
}




export const deleteSubFolder = (id, folderData) => async (dispatch) => {
    // folderData - {parentFolder}
    try {
        console.log('id,folderDAta', id, folderData)
        const { data } = await api.deleteSubFolder(id, folderData)
        console.log('data in deleteSubFolder- action.js', data)
        dispatch({ type: DELETE_SUB_FOLDER, payload: data })
    } catch (error) {
        console.log("error in deleteSubFolder - folder.js actions", error)
    }
}