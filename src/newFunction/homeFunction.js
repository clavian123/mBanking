import axios from 'axios';

import {
    setLoading
} from './loadingAction';

export const linkUnlinkAccount = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/linkUnlinkAccount";
    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(address, req);
            dispatch(setLoading(false));
            return await res.data;
        } catch {
            dispatch(setLoading(false));
        }
    }
}

export const getUserName = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/getUserName";
    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(address, req);
            dispatch(setLoading(false));
            return await res.data;
        } catch {
            dispatch(setLoading(false));
        }
    }
}

export const getAccountList = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/getAccountListFromCore";
    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(address, req);
            dispatch(setLoading(false));
            return await res.data;
        } catch {
            dispatch(setLoading(false));
        }
    }
}

export const getLastTransactions = (account_number) => {
    let req = {
        account_number: account_number
    }
    let address = "http://192.168.0.105:8080/getLastStatements"
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

export const getAccountStatementsFilterMonth = (account_number, month) => {
    let req = {
        account_number: account_number,
        month: month
    }
    let address = "http://192.168.0.105:8080/getAccountStatementsFilterMonth"
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