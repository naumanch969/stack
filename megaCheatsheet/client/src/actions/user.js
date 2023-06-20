import * as api from "../api/index"
import { SIGNUP, LOGIN, LOGOUT } from "../constants/index"

export const signUp = (userData) => async (dispatch) => {
    try {
        const { data } = await api.signUp(userData)
        console.log('data of signUp user ', data)
        dispatch({ type: SIGNUP, payload: data })
    } catch (error) {
        console.log("error in sign up - auth.js actions", error)
    }
}

export const login = (userData, navigate) => async (dispatch) => {
    try {
        console.log('userData', userData)
        const { data } = await api.login(userData)
        console.log('data of login user ', data)
        dispatch({ type: LOGIN, payload: data })
        navigate("/")
    } catch (error) {
        console.log("error in sign in - auth.js actions", error)
    }
}


export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT })
    } catch (error) {
        console.log("error in logout - auth.js actions", error)
    }
}