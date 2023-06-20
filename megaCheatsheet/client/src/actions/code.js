import * as api from "../api/index"
import { GET_CODE, GET_CODES, CREATE_CODE, UPDATE_CODE, COMMENT_CODE, LIKE_CODE, DELETE_CODE, START_LOADING, END_LOADING, ERROR } from "../constants/index"




export const getCode = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getCode()
        console.log('data getCode actions.js', data)
        dispatch({ type: GET_CODE, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getCode - code.js actions", err)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error: error } })
    }
}


export const getCodes = (codesPerPage) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getCodes(codesPerPage)
        console.log('data getCodes actions.js', data)
        dispatch({ type: GET_CODES, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getCodes - code.js actions", err)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error: error } })
    }
}



export const createCode = (codeData) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.createCode(codeData)
        console.log('data createCode actions.js', data)
        dispatch({ type: CREATE_CODE, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in createCode - code.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error: error } })
    }
}



export const updateCode = (id, codeData) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.updateCode(id, codeData)
        console.log('data updateCode actions.js', data)
        dispatch({ type: UPDATE_CODE, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in updateCode - code.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error: error } })
    }
}



export const likeCode = (id) => async (dispatch) => {
    try {

        const { data } = await api.likeCode(id)
        console.log('data likeCode actions.js', data)
        dispatch({ type: LIKE_CODE, payload: data })

    } catch (error) {
        console.log("error in likeCode - code.js actions", error)
        dispatch({ type: ERROR, payload: { error: error } })
    }
}



export const commentCode = (id, comment) => async (dispatch) => {
    try {

        const { data } = await api.commentCode(id, comment)
        console.log('data commentCode actions.js', data)
        dispatch({ type: COMMENT_CODE, payload: data })

    } catch (error) {
        console.log("error in commentCode - code.js actions", error)
        dispatch({ type: ERROR, payload: { error: error } })
    }
}



export const deleteCode = (id) => async (dispatch) => {
    try {
        // show confirmation

        const { data } = await api.deleteCode(id)
        console.log('data updateCode actions.js', data)
        dispatch({ type: DELETE_CODE, payload: data })


    } catch (error) {
        console.log("error in deleteCode - code.js actions", error)
        dispatch({ type: ERROR, payload: { error: error } })
    }
}