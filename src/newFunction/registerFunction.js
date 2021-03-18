import axios from 'axios';
import { add, set } from 'react-native-reanimated';

import {
    setLoading
} from './loadingAction';

export const checkPanExist = (pan) => {
    let req = {
        pan: pan
    }
    let address = "http://localhost:8181/checkPanExist"
    return async dispatch => {
        try {
            let res = await axios.post(address, req)
            return await res.data
        } catch {
        }
    }
}

export const checkPanExistWithLoading = (pan) => {
    let req = {
        pan: pan
    }
    let address = "http://localhost:8181/checkPanExist"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            let res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const getEmail = () => {
    let address = "http://localhost:8181/getEmail"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            let res = await axios.post(address)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const sendRegisterOtp = () => {
    let address = "http://localhost:8181/sendRegisterOTP"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            let res = await axios.post(address)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const validateRegisterOtp = (token) => {
    let req = {
        token: token
    }
    let address = "http://localhost:8181/validateRegisterOTP"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            let res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const validatePin = (pin) => {
    let req = {
        pin: pin
    } 
    let address = "http://localhost:8181/validateCustomerPIN"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            let res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const checkCustomerExist = () => {
    let address = "http://localhost:8080/checkCustomerExist"
    return async dispatch => {
        try {
            let res = await axios.post(address)
            return await res.data
        } catch {
        }
    }
}

export const getUsername = () => {
    let address = "http://localhost:8080/usernameResetPassword"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            let res = await axios.post(address)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const resetUserPassword = (password) => {
    let req = {
        password: password
    }
    let address = "http://localhost:8080/resetPassword"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            let res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const checkUsernameExist = (username) => {
    let req = {
        username: username
    }
    let address = "http://localhost:8080/checkUsernameExist"
    return async dispatch => {
        try {
            let res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const createNewUser = (username, password) => {
    let req = {
        username: username,
        password: password
    }
    let address = "http://localhost:8080/createNewUser"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            let res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}