import * as api from "../api/index"
import { GET_TASK, GET_TASKS, GET_USER_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK, START_LOADING, END_LOADING, ERROR } from "../constants/index"





export const getTask = (id) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getTask(id)
        // console.log('data getTask actions.js', data)
        dispatch({ type: GET_TASK, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getTask - task.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}


export const getTasks = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getTasks()
        console.log('data getTasks actions.js', data)
        dispatch({ type: GET_TASKS, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getTasks - task.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const getUserTasks = () => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.getUserTasks()
        console.log('data getUserTasks actions.js', data)
        dispatch({ type: GET_USER_TASKS, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in getUserTasks - task.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const createTask = (TaskData) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.createTask(TaskData)
        console.log('data createTask actions.js', data)
        dispatch({ type: CREATE_TASK, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in createTask - task.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}



export const updateTask = (id, TaskData) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const { data } = await api.updateTask(id, TaskData)
        console.log('data updateTask actions.js', data)
        dispatch({ type: UPDATE_TASK, payload: data })

        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log("error in updateTask - task.js actions", error)
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}








export const deleteTask = (id) => async (dispatch) => {
    try {
        // show confirmation

        const { data } = await api.deleteTask(id)
        console.log('data deleteTask actions.js', data)
        dispatch({ type: DELETE_TASK, payload: data })


    } catch (error) {
        console.log("error in deleteTask - task.js actions", error)
        dispatch({ type: ERROR, payload: { error } })
    }
}