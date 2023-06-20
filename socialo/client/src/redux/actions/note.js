import * as api from "../api/index"
import {
    start,
    end,
    error,
    getNoteReducer,
    getNotesReducer,
    createNoteReducer,
    updateNoteReducer,
    deleteNoteReducer,
} from "../reducers/note"


export const getNote = (id) => async (dispatch) => {
      try {
        dispatch(start())
        const {data} = await api.getNote(id)
        dispatch(getNoteReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const getNotes = () => async (dispatch) => {
      try {
        dispatch(start())
        const {data} = await api.getNotes()
        dispatch(getNotesReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const getUserNotes = () => async (dispatch) => {
    try {
        dispatch(start())
        const {data} = await api.getUserNotes()
        dispatch(getNotesReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const createNote = (noteData) => async (dispatch) => {
     try {
        dispatch(start())
        const {data} = await api.createNote(noteData)
        dispatch(createNoteReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const updateNote = (id, noteData) => async (dispatch) => {
   try {
        dispatch(start())
        const {data} = await api.updateNote(id,noteData)
        dispatch(updateNoteReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const bookmarkNote = (id) => async (dispatch) => {
   try {
        dispatch(start())
        const {data} = await api.bookmarkNote(id)
        dispatch(updateNoteReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const deleteNote = (id) => async (dispatch) => {
    try {
        dispatch(start())
        const {data} = await api.deleteNote(id)
        dispatch(deleteNoteReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}