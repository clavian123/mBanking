import axios from 'axios';

import {
    setLoading
} from './loadingAction';

export const getBillPaymentMerchants = () => {
    let address = "http://192.168.0.105:8080/getBillPaymentMerchants"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const setMerchantCode = (merchant_code, merchant_name) => {
    let req = {
        merchant_code,
        merchant_name
    }
    let address = "http://192.168.0.105:8080/setMerchantCode";
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const getUserTargetSubscribers = (device_id, merchant_code) => {
    let req = {
        device_id: device_id,
        merchant_code: merchant_code
    }
    let address = "http://192.168.0.105:8080/getUserTargetSubscribers"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const inactiveTargetSubscriber = (device_id, subscriber_number) => {
    let req = {
        device_id: device_id,
        subscriber_number: subscriber_number
    }
    let address = "http://192.168.0.105:8080/inactiveTargetSubscriber"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const checkSubscriberExist = (subscriber_number) => {
    let req = {
        subscriber_number: subscriber_number
    }
    let address = "http://192.168.0.105:8282/checkSubscriberExist"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const setTargetSubscriber = (subscriber_number, subscriber_name, alias) => {
    let req = {
        subscriber_name: subscriber_name,
        subscriber_number: subscriber_number,
        alias: alias
    }
    let address = "http://192.168.0.105:8080/setTargetSubscriber"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const getBilledAmount = () => {
    let address = "http://192.168.0.105:8080/getBilledAmount"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const setBillPaymentSourceAccount = (source_account_number, source_account_name, source_account_balance, amount) => {
    let req = {
        source_account_number: source_account_number,
        source_account_name: source_account_name,
        source_account_balance: source_account_balance,
        amount: amount
    }
    let address = "http://192.168.0.105:8080/setBillPaymentSourceAccount"
    return async dispatch => {
        dispatch(setLoading(true))
        try { 
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const getBillPaymentConfirmation = () => {
    let address = "http://192.168.0.105:8080/getBillPaymentConfirmation"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const checkTargetSubscriberExist = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/checkTargetSubscriberExist"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const sendBillPaymentOtp = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/sendBillPaymentOTP"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address,req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const validateBillPaymentOtp = (token) => {
    let req = {
        token: token
    }
    let address = "http://192.168.0.105:8080/validateBillPaymentOTP"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const createBillPaymentTransaction = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/createBillPaymentTransaction"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

