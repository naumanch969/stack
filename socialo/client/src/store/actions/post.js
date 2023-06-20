import * as api from "../api"
import {
    GET_POSTS,
    CREATE_POST,
    LIKE_POST,
    COMMENT_POST,

    START_LOADING,
    END_LOADING,
    ERROR
} from "../constants"



export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getPosts()
        dispatch({ type: GET_POSTS, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error: error.message } })
    }
}
export const getUserPosts = (id) => async (dispatch) => {
    try {
        console.log('id', id)
        dispatch({ type: START_LOADING })
        const { data } = await api.getUserPosts(id)
        dispatch({ type: GET_POSTS, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error: error.message } })
    }
}

export const createPost = (postData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createPost(postData)
        dispatch({ type: CREATE_POST, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error: error.message } })
    }
}
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE_POST, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error: error.message } })
    }
}

export const commentPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.createPost(postData)
        dispatch({ type: COMMENT_POST, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error: error.message } })
    }
}

