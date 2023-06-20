import * as api from "../api"
import Cookie from 'js-cookie'
import {
    START_LOADING,
    END_LOADING,
    ERROR,

    ACCEPT_FRIEND_REQUEST,
    SEND_FRIEND_REQUEST,

    GET_ALL_USERS,
    SEND_OTP,
    CHANGE_PASSWORD,
    REGISTER,
    LOGIN,
    LOGOUT,
    REMOVE_ACCOUNT

} from '../constants'


export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const result = await api.getAllUsers()
        const data = result.data
        dispatch({ type: GET_ALL_USERS, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}


// users
const initialUser = { name: '', gender: 'male', DOB: '4/6/2000', location: '', email: '', phone: '', userName: '', password: '', profilePicture: '', bio: '', registeredAt: '', loginAt: '', }
const initialErrorObj = { login: '', register: '', sendEmailVerificationOTP: '', sendForgetPasswordOTP: '', changePassword: '' }

export const sendEmailVerificationOTP = (email, userState, setUserState) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.sendEmailVerificationOTP(email)
        if (data.success) {
            dispatch({ type: SEND_OTP, payload: data })
            setUserState({ ...userState, errorObj: initialErrorObj, page: 'register_otp' })
        }
        else {
            setUserState({ ...userState, errorObj: { ...userState.errorObj, sendEmailVerificationOTP: data.message } })
        }
        dispatch({ type: END_LOADING })
    } catch (error) {
        setUserState({ ...userState, errorObj: { ...userState.errorObj, sendEmailVerificationOTP: error?.response?.data?.message || error.message } })
        dispatch({ type: END_LOADING })
    }
}
export const register = (userData, userState, setUserState) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const result = await api.register(userData)
        const data = result.data
        if (data.success) {
            dispatch({ type: REGISTER, payload: data })
            userState.page = 'login'
            userState.errorObj = initialErrorObj
            setUserState({ ...userState })
        }
        else {
            setUserState({ ...userState, errorObj: { ...initialErrorObj, register: data.message } })
        }
        dispatch({ type: END_LOADING })
    } catch (error) {
        setUserState({ ...userState, errorObj: { ...initialErrorObj, register: error?.response?.data?.message } })
        dispatch({ type: END_LOADING })
    }
}
export const login = (userData, navigate, userState, setUserState) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.login(userData)
        if (data.success) {
            dispatch({ type: LOGIN, payload: data })
            var updatedAccounts;

            if (Cookie.get('accounts')) {       // if there exist a account on user pc/browser
                let accounts = JSON.parse(Cookie.get('accounts'))
                updatedAccounts = accounts.concat(data.result)
            }
            else {                              // if this is first login on user browser
                updatedAccounts = [data.result]
            }

            userState.errorObj = initialErrorObj
            userState.accounts = updatedAccounts
            userState.user = data.result
            userState.userData = initialUser
            setUserState({ ...userState })

            console.log('userState in user.js', userState)

            Cookie.set('profile', JSON.stringify(data.result))
            Cookie.set('accounts', JSON.stringify(userState.accounts))
            navigate('/')
        }
        else {
            setUserState({ ...userState, errorObj: { ...initialErrorObj, login: data.message } })
        }
        dispatch({ type: END_LOADING })
    } catch (error) {
        setUserState({ ...userState, errorObj: { ...initialErrorObj, login: error?.response?.data?.message } })
        dispatch({ type: END_LOADING })
    }
}
export const sendForgetPasswordOTP = (email, userState, setUserState) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const result = await api.sendForgetPasswordOTP(email)
        const data = result.data
        if (data.success) {
            dispatch({ type: SEND_OTP, payload: data })
            setUserState({ ...userState, errorObj: initialErrorObj, page: 'change_password' })
        }
        else {
            setUserState({ ...userState, errorObj: { ...initialErrorObj, sendForgetPasswordOTP: data.message } })
        }
        dispatch({ type: END_LOADING })
    } catch (error) {
        setUserState({ ...userState, errorObj: { ...initialErrorObj, sendForgetPasswordOTP: error?.response?.data?.message } })
        dispatch({ type: END_LOADING })
    }
}
export const changePassword = (userData, userState, setUserState) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const result = await api.changePassword(userData)         //email, password, otp
        const data = result.data
        if (data.success) {
            dispatch({ type: CHANGE_PASSWORD, payload: data })
            setUserState({ ...userState, errorObj: { ...initialErrorObj, errorObj: initialErrorObj }, userData: initialUser, page: 'login' })
        }
        else {
            setUserState({ ...userState, errorObj: { ...initialErrorObj, changePassword: data.message } })
        }

        dispatch({ type: END_LOADING })
    } catch (error) {
        setUserState({ ...userState, errorObj: { ...initialErrorObj, changePassword: error?.response?.data?.message } })
        dispatch({ type: END_LOADING })
    }
}
export const logout = (navigate, userState, setUserState) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log(userState.accounts)
        setUserState({ ...userState, user: null })
        navigate('/')
        Cookie.remove('profile')
        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
    }
}
export const removeAccount = (accountId, userState, setUserState) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const result = await api.removeAccount(accountId)
        const data = result.data
        dispatch({ type: REMOVE_ACCOUNT, payload: data })

        let accounts = JSON.parse(Cookie.get('accounts'))
        accounts = accounts.filter(account => account._id !== accountId)
        Cookie.set('accounts', JSON.stringify(accounts))
        userState.accounts = accounts
        setUserState({ ...userState })
        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
    }
}









export const sendFriendRequest = (receiverId, type, content, userState, setUserState) => async (dispatch) => {
    try {
        const { data } = await api.sendFriendRequest(receiverId, type, content)
        dispatch({ type: SEND_FRIEND_REQUEST, payload: data })
        const sender = data.result.sender
        const receiver = data.result.receiver
        let accounts = JSON.parse(Cookie.get('accounts'))
        accounts = accounts.map(account => account._id == sender._id ? account = sender : account)
        accounts = accounts.map(account => account._id == receiver._id ? account = receiver : account)
        Cookie.set('profile', JSON.stringify(sender))
        Cookie.set('accounts', JSON.stringify(accounts))
        userState.user = sender
        userState.accounts = accounts
        setUserState({ ...userState })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const acceptFriendRequest = (senderId, userState, setUserState) => async (dispatch) => {      // in this request, user is the accepter
    try {
        const { data } = await api.acceptFriendRequest(senderId)
        if (data.success) {
            dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: data })
            const sender = data.result.sender
            const accepter = data.result.accepter
            let accounts = JSON.parse(Cookie.get('accounts'))
            accounts = accounts.map(account => account._id == sender._id ? account = sender : account)
            accounts = accounts.map(account => account._id == accepter._id ? account = accepter : account)
            Cookie.set('profile', JSON.stringify(accepter))
            Cookie.set('accounts', JSON.stringify(accounts))
            userState.user = accepter
            userState.accounts = accounts
            setUserState({ ...userState })
        }
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}

export const removeFriendRequest = (receiverId, userState, setUserState) => async (dispatch) => {
    try {
        const { data } = await api.removeFriendRequest(receiverId)
        if (data.success) {
            dispatch({ type: SEND_FRIEND_REQUEST, payload: data })
            const sender = data.result.sender
            const receiver = data.result.receiver
            let accounts = JSON.parse(Cookie.get('accounts'))
            accounts = accounts.map(account => account._id == sender._id ? account = sender : account)
            accounts = accounts.map(account => account._id == receiver._id ? account = receiver : account)
            Cookie.set('profile', JSON.stringify(sender))
            Cookie.set('accounts', JSON.stringify(accounts))
            userState.user = sender
            userState.accounts = accounts
            setUserState({ ...userState })
        }
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
// profile = 'user is logged in'
// 'accounts.length > 1 then show switch account option '
// accounts = 'these accounts have tokens saved in browser'
// 'accounts.length > 1 then show remove account from this device option '
// 'accounts.length = 1 then if user logged out then remove his account from the device as well '
// switchAccount = 'get account info from accounts, and use it for login'
// removeAccount = 'filter account from accounts'