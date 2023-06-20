import * as api from "../api/index"
import {
    GET_ACTIVITY,
    GET_USER_ACTIVITIES,
    GET_ACTIVITIES,

    CREATE_ACTIVITY,

    UPDATE_ACTIVITY,
    ADD_LINK,
    UPDATE_LINK,
    DELETE_LINK,
    UPDATE_HEADING,
    ADD_IMAGE,
    DELETE_IMAGE,
    UPDATE_TEXT,
    UPDATE_BG,

    DELETE_ACTIVITY,

    START_LOADING,
    END_LOADING,
    ERROR
} from "../constants/index"










export const getActivity = (id) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getActivity(id)
        console.log('data getActivity actions.js', data)
        dispatch({ type: GET_ACTIVITY, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getActivity - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}








export const getActivities = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getActivities()
        console.log('data getActivities actions.js', data)
        dispatch({ type: GET_ACTIVITIES, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getActivities - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const getUserActivities = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getUserActivities()
        console.log('data getUserActivities actions.js', data)
        dispatch({ type: GET_USER_ACTIVITIES, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getUserActivities - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const createActivity = (activityData) => async (dispatch) => {
    console.log('activityData', activityData)
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createActivity(activityData)
        console.log('data createActivity actions.js', data)
        dispatch({ type: CREATE_ACTIVITY, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in createActivity - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const updateActivity = (id, ACTIVITYData) => async (dispatch) => {
    try {

        console.log(`ACTIVITYData`, ACTIVITYData)

        dispatch({ type: START_LOADING })

        const { data } = await api.updateActivity(id, ACTIVITYData)
        console.log('data updateActivity actions.js', data)
        dispatch({ type: UPDATE_ACTIVITY, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in updateActivity - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const updateBg = (id, bg) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.updateBg(id, bg)
        console.log('data updateBg actions.js', data)
        dispatch({ type: UPDATE_BG, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in updateBg - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const addLink = (activityId, linkData) => async (dispatch) => {
    // linkData = {link, timeLapseId}
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.addLink(activityId, linkData)
        console.log('data addLink actions.js', data)
        dispatch({ type: ADD_LINK, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in addLink - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateLink = (id, linkData) => async (dispatch) => {
    // linkData = {link, timeLapseId, linkId}
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.updateLink(id, linkData)            // id of activity, {Headin, timeLapseId}
        console.log('data updateLink actions.js', data)
        dispatch({ type: UPDATE_LINK, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in updateLink - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const deleteLink = (id, { timeLapseId, linkId }) => async (dispatch) => {
    // linkData = {timeLapseId, linkId}
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.deleteLink(id, { timeLapseId, linkId })                // id of activity, {timeLapseId,linkId}
        console.log('data deleteLink actions.js', data)
        dispatch({ type: DELETE_LINK, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in deleteLink - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}









export const addImage = (activityId, imageData) => async (dispatch) => {
    // imageData = file, url, timeLapseId}
    try {

        console.log(`activityId, imageData`, activityId, imageData)


        dispatch({ type: START_LOADING })

        const { data } = await api.addImage(activityId, imageData)
        console.log('data addImage actions.js', data)
        dispatch({ type: ADD_IMAGE, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in addImage - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const deleteImage = (id, { timeLapseId, imageId }) => async (dispatch) => {
    // imageData = {timeLapseId, imageId}
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.deleteImage(id, { timeLapseId, imageId })                // id of activity, {timeLapseId,imageId}
        console.log('data deleteImage actions.js', data)
        dispatch({ type: DELETE_IMAGE, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in deleteImage - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}













export const updateText = (id, textData) => async (dispatch) => {
    try {
        console.log(`textData`, textData)
        dispatch({ type: START_LOADING })

        const { data } = await api.updateText(id, textData)            // id of activity, {Headin, timeLapseId}
        console.log('data updateText actions.js', data)
        dispatch({ type: UPDATE_TEXT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log("error in updateText - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const updateHeading = (id, headingData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log('headingData', headingData)

        const { data } = await api.updateHeading(id, headingData)            // id of activity, {Headin, timeLapseId}
        console.log('data updateHeading actions.js', data)
        dispatch({ type: UPDATE_HEADING, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log("error in updateHeading - ACTIVITY.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}

















export const deleteActivity = (id) => async (dispatch) => {
    try {
        // show confirmation

        const { data } = await api.deleteActivity(id)
        console.log('data deleteActivity actions.js', data)
        dispatch({ type: DELETE_ACTIVITY, payload: data })


    } catch (error) {
        console.log("error in deleteActivity - ACTIVITY.js actions", error)
        dispatch({ type: ERROR, payload: { error } })
    }
}