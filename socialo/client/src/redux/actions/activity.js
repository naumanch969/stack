import * as api from "../api/index"
import {
    getActivityReducer,
    getActivitiesReducer,
    getUserActivitiesReducer,
    createActivityReducer,
    updateActivityReducer,
    deleteActivityReducer,
    start,
    end,
    error,
 }  from '../reducers/activity'


export const getActivity = (id) => async (dispatch) => {
    try {
        dispatch(start())
        const {data} = await api.getActivity(id)
        dispatch(getActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const getActivities = () => async (dispatch) => {
       try {
        dispatch(start())
        const {data} = await api.getActivities()
        dispatch(getActivitiesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const getUserActivities = () => async (dispatch) => {
    try {
        dispatch(start())
        const {data} = await api.getUserActivities()
        dispatch(getUserActivitiesReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const createActivity = (activityData) => async (dispatch) => {
      try {
        dispatch(start())
        const {data} = await api.createActivity(activityData)
        dispatch(createActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const updateActivity = (id, activityData) => async (dispatch) => {
      try {
        dispatch(start())
        const {data} = await api.updateActivity(id, activityData)
        dispatch(updateActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const updateBg = (id, bg) => async (dispatch) => {
    try {
        dispatch(start())
        const {data} = await api.updateBg(id, bg)
        dispatch(updateActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const addLink = (activityId, linkData) => async (dispatch) => {
    try {
        dispatch(start())
        const {data} = await api.addLink(activityId,linkData)
        addLinkReducer(updateActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const updateLink = (id, linkData) => async (dispatch) => {
    try {
        dispatch(start())
        const {data} = await api.updateLink(id, linkData)
        dispatch(updateActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const deleteLink = (id, { timeLapseId, linkId }) => async (dispatch) => {
       try {
        dispatch(start())
        const {data} = await api.deleteLink(id, timeLapseId, linkId)
        dispatch(updateActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const addImage = (activityId, imageData) => async (dispatch) => {
       try {
        dispatch(start())
        const {data} = await api.addImage(activityId, imageData)
        dispatch(updateActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const deleteImage = (id, { timeLapseId, imageId }) => async (dispatch) => {
      try {
        dispatch(start())
        const {data} = await api.deleteImage(id, {timeLapseId,imageId})
        dispatch(updateActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const updateText = (id, textData) => async (dispatch) => {
       try {
        dispatch(start())
        const {data} = await api.updateText(id,textData)
        dispatch(updateActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const updateHeading = (id, headingData) => async (dispatch) => {
       try {
        dispatch(start())
        const {data} = await api.updateHeading(id, headingData)
        dispatch(updateActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const deleteActivity = (id) => async (dispatch) => {
    try {
        dispatch(start())
        const {data} = await api.deleteActivity(id)
        dispatch(deleteActivityReducer(data.result))
        dispatch(end())
    } catch (err) {
             const e = err?.response?.data
        var errorMessage;
        e.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}