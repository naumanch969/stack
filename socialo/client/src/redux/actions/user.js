import * as api from "../api"
import Cookie from 'js-cookie'
import {
    start,
    end,
    error,
    getAllUsersReducer,
    sendOTPReducer,
    registerReducer,
    loginReducer,
    changePasswordReducer,
    removeAccountReducer,
    sendFriendRequestReducer,
    acceptFriendRequestReducer,
} from '../reducers/user'


export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(start())
        const {data} = await api.getAllUsers()
        dispatch(getAllUsersReducer(data.result))
        dispatch(end())
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}


// users
const initialUser = { name: '', gender: 'male', DOB: '4/6/2000', location: '', email: '', phone: '', userName: '', password: '', profilePicture: '', bio: '', registeredAt: '', loginAt: '', }
const initialErrorObj = { login: '', register: '', sendEmailVerificationOTP: '', sendForgetPasswordOTP: '', changePassword: '' }

export const sendEmailVerificationOTP = (email, userState, setUserState) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.sendEmailVerificationOTP(email)
        if (data.success) {
            dispatch(sendOTPReducer(data.result))
            setUserState({ ...userState, errorObj: initialErrorObj, page: 'register_otp' })
        }
        else {
            setUserState({ ...userState, errorObj: { ...userState.errorObj, sendEmailVerificationOTP: data.message } })
        }
        dispatch(end())
    } catch (err) {
        setUserState({ ...userState, errorObj: { ...userState.errorObj, sendEmailVerificationOTP: error?.response?.data?.message || error.message } })
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
export const register = (userData, userState, setUserState) => async (dispatch) => {
    try {
        dispatch(start())
        const result = await api.register(userData)
        const data = result.data
        if (data.success) {
            dispatch(registerReducer(data.result))
            userState.page = 'login'
            userState.errorObj = initialErrorObj
            setUserState({ ...userState })
        }
        else {
            setUserState({ ...userState, errorObj: { ...initialErrorObj, register: data.message } })
        }
        dispatch(end())
    } catch (err) {
        setUserState({ ...userState, errorObj: { ...initialErrorObj, register: error?.response?.data?.message } })
        dispatch(end())
    }
}
export const login = (userData, navigate, userState, setUserState) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.login(userData)
        if (data.success) {
            dispatch(loginReducer(data.result))
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

            Cookie.set('profile', JSON.stringify(data.result))
            Cookie.set('accounts', JSON.stringify(userState.accounts))
            navigate('/')
        }
        else {
            setUserState({ ...userState, errorObj: { ...initialErrorObj, login: data.message } })
        }
        dispatch(end())
    } catch (err) {
        setUserState({ ...userState, errorObj: { ...initialErrorObj, login: error?.response?.data?.message } })
        dispatch(end())
    }
}
export const sendForgetPasswordOTP = (email, userState, setUserState) => async (dispatch) => {
    try {
        dispatch(start())
        const result = await api.sendForgetPasswordOTP(email)
        const data = result.data
        if (data.success) {
            dispatch(sendOTPReducer(data.result))
            setUserState({ ...userState, errorObj: initialErrorObj, page: 'change_password' })
        }
        else {
            setUserState({ ...userState, errorObj: { ...initialErrorObj, sendForgetPasswordOTP: data.message } })
        }
        dispatch(end())
    } catch (err) {
        setUserState({ ...userState, errorObj: { ...initialErrorObj, sendForgetPasswordOTP: error?.response?.data?.message } })
        dispatch(end())
    }
}
export const changePassword = (userData, userState, setUserState) => async (dispatch) => {
    try {
        dispatch(start())
        const result = await api.changePassword(userData)         //email, password, otp
        const data = result.data
        if (data.success) {
            dispatch(changePasswordReducer(data.result))
            setUserState({ ...userState, errorObj: { ...initialErrorObj, errorObj: initialErrorObj }, userData: initialUser, page: 'login' })
        }
        else {
            setUserState({ ...userState, errorObj: { ...initialErrorObj, changePassword: data.message } })
        }
        dispatch(end())
    } catch (err) {
        setUserState({ ...userState, errorObj: { ...initialErrorObj, changePassword: error?.response?.data?.message } })
        dispatch(end())
    }
}
export const logout = (navigate, userState, setUserState) => async (dispatch) => {
    try {
        dispatch(start())
        setUserState({ ...userState, user: null })
        navigate('/')
        Cookie.remove('profile')
        dispatch(end())
    } catch (err) {
        dispatch(end())
    }
}
export const removeAccount = (accountId, userState, setUserState) => async (dispatch) => {
    try {
        dispatch(start())
        const result = await api.removeAccount(accountId)
        const data = result.data
        dispatch(removeAccountReducer(data.result))

        let accounts = JSON.parse(Cookie.get('accounts'))
        accounts = accounts.filter(account => account._id !== accountId)
        Cookie.set('accounts', JSON.stringify(accounts))
        userState.accounts = accounts
        setUserState({ ...userState })
        dispatch(end())
    } catch (err) {
        dispatch(end())
    }
}

export const sendFriendRequest = (receiverId, type, content, userState, setUserState) => async (dispatch) => {
    try {
        const { data } = await api.sendFriendRequest(receiverId, type, content)
        dispatch(sendFriendRequestReducer(data.result))
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
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const acceptFriendRequest = (senderId, userState, setUserState) => async (dispatch) => {      // in this request, user is the accepter
    try {
        const { data } = await api.acceptFriendRequest(senderId)
        if (data.success) {
            dispatch(acceptFriendRequestReducer(data.result))
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
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const removeFriendRequest = (receiverId, userState, setUserState) => async (dispatch) => {
    try {
        const { data } = await api.removeFriendRequest(receiverId)
        if (data.success) {
            dispatch(sendFriendRequestReducer(data.result))
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
    } catch (err) {
              const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
// profile = 'user is logged in'
// 'accounts.length > 1 then show switch account option '
// accounts = 'these accounts have tokens saved in browser'
// 'accounts.length > 1 then show remove account from this device option '
// 'accounts.length = 1 then if user logged out then remove his account from the device as well '
// switchAccount = 'get account info from accounts, and use it for login'
// removeAccount = 'filter account from accounts'