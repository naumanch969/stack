import * as api from "../api"
import {
    getTaskReducer,
    getTasksReducer,
    createTaskReducer,
    updateTaskReducer,
    deleteTaskReducer,
    start,
    end,
    error,
} from "../reducers/task"


export const getTask = (id) => async (dispatch) => {
     try {
        dispatch(start())
        const {data} = await api.getTask(id)
        dispatch(getTaskReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const getTasks = () => async (dispatch) => {
     try {
        dispatch(start())
        const {data} = await api.getTasks()
        dispatch(getTasksReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const getUserTasks = () => async (dispatch) => {
      try {
        dispatch(start())
        const {data} = await api.getUserTasks()
        dispatch(getTasksReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const createTask = (taskData) => async (dispatch) => {
     try {
        dispatch(start())
        const {data} = await api.createTask(taskData)
        dispatch(createTaskReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const updateTask = (id, taskData) => async (dispatch) => {
      try {
        dispatch(start())
        const {data} = await api.updateTask(id,taskData)
        dispatch(updateTaskReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const deleteTask = (id) => async (dispatch) => {
  try {
        dispatch(start())
        const {data} = await api.deleteTask(id)
        dispatch(deleteTaskReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}