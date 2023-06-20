import * as api from "../api/index"
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




export const getNote = (id) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getNote(id)
        console.log('data getNote actions.js', data)
        dispatch({ type: GET_NOTE, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getNote - note.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}


export const getNotes = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getNotes()
        console.log('data getNotes actions.js', data)
        dispatch({ type: GET_NOTES, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getNotes - note.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const getUserNotes = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getUserNotes()
        console.log('data getUserNotes actions.js', data)
        dispatch({ type: GET_USER_NOTES, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getUserNotes - note.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const createNote = (noteData) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.createNote(noteData)
        console.log('data createnote actions.js', data)
        dispatch({ type: CREATE_NOTE, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in createnote - note.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const updateNote = (id, noteData) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.updateNote(id, noteData)
        console.log('data updatenote actions.js', data)
        dispatch({ type: UPDATE_NOTE, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in updatenote - note.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}






export const bookmarkNote = (id) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.bookmarkNote(id)
        console.log('data bookmarkNote actions.js', data)
        dispatch({ type: BOOKMARK_NOTE, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in bookmarkNote - note.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}





export const deleteNote = (id) => async (dispatch) => {
    try {
        // show confirmation

        const { data } = await api.deleteNote(id)
        console.log('data deleteNote actions.js', data)
        dispatch({ type: DELETE_NOTE, payload: data })


    } catch (error) {
        console.log("error in deletenote - note.js actions", error)
        dispatch({ type: ERROR, payload: { error } })
    }
}