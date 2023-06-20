import * as api from "../api"
import {
    getPostReducer,
    getPostsReducer,
    createPostReducer,
    updatePostReducer,
    deletePostReducer,
    start,
    end,
    error,
} from "../reducers/post"



export const getPosts = () => async (dispatch) => {
     try {
        dispatch(start())
        const {data} = await api.getPosts()
        dispatch(getPostsReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const getUserPosts = (id) => async (dispatch) => {
     try {
        dispatch(start())
        const {data} = await api.getUserPosts(id)
        dispatch(getUserPostsReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const createPost = (postData) => async (dispatch) => {
     try {
        dispatch(start())
        const {data} = await api.createPost(postData)
        dispatch(createPostReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const likePost = (id) => async (dispatch) => {
     try {
        dispatch(start())
        const {data} = await api.likePost(id)
        dispatch(updatePostReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const commentPost = (postData) => async (dispatch) => {
      try {
        dispatch(start())
        const {data} = await api.commentPost(postData)
        dispatch(updatePostReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const deletePost = (id) => async (dispatch) => {
      try {
        dispatch(start())
        const {data} = await api.deletePost(id)
        dispatch(deletePostReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}