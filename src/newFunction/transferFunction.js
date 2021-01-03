import axios from 'axios';
import {
    setLoading
} from './loadingAction';

export const getTargetAccountList = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/getUserTargetAccounts";
    return async dispatch => {
        dispatch(setLoading(true))
        try{
            const res = await axios.post(address, req);
            dispatch(setLoading(false))
            return await res.data;
        } catch {
            dispatch(setLoading(false));
        }
    }
}

export const inactiveTargetAccount = (device_id, bank_name, account_number) => {
    let req = {
        device_id: device_id,
        bank_name: bank_name,
        account_number: account_number
    }
    let address = "http://192.168.0.105:8080/inactiveTargetAccount";
    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const setTargetAccount = (target_account_name, target_account_number, target_bank_name) => {
    let req = {
        target_account_name: target_account_name,
        target_account_number: target_account_number,
        target_bank_name: target_bank_name
    }
    let address = "http://192.168.0.105:8080/setTargetAccount";
    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(address, req);
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const getTargetAccount = () => {
    let address = "http://192.168.0.105:8080/getTargetAccount";
    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(address);
            dispatch(setLoading(false));
            return await res.data;
        } catch {
            dispatch(setLoading(false));
        }
    }
}

export const getBankList = () => {
    let address = "http://192.168.0.105:8080/getExternalBanks";
    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(address);
            dispatch(setLoading(false));
            return await res.data;
        } catch {
            dispatch(setLoading(false));
        }
    }
}

export const checkAccountExist = (account_number) => {
    let req = {
        account_number: account_number
    }
    let address = "http://192.168.0.105:8181/checkAccountExistFromCore";
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

export const setTransferSourceAccount = (source_account_number, source_account_name, source_account_balance, amount, customer_note) => {
    let req = {
        source_account_number: source_account_number,
        source_account_name: source_account_name,
        source_account_balance: source_account_balance,
        amount: amount,
        customer_note: customer_note
    }
    let address = "http://192.168.0.105:8080/setTransferSourceAccount"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false));
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const getTransferMethod = () => {
    let address = "http://192.168.0.105:8080/getTransferMethod";
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

export const setTransferMethod = (method, fee) => {
    let req = {
        method: method,
        fee: fee
    }
    let address = "http://192.168.0.105:8080/setTransferMethod"
    return async dispatch => {
        dispatch(setLoading(true))
        try{
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const transferConfirmation = () => {
    let address = "http://192.168.0.105:8080/transferConfirmation"
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

export const checkTargetAccountExist = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/checkTargetAccountExist"
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

export const sendTransferOtp = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/sendTransferOTP"
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

export const transferGetUserEmail = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/transferGetUserEmail"
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const res = await axios.post(address, req)
            dispatch(setLoading(false))
            return await res.data
        } catch {
            dispatch(setLoading(true))
        }
    }
}

export const validateTransferOtp = (token) => {
    let req = {
        token: token
    }
    let address = "http://192.168.0.105:8080/validateTransferOTP"
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

export const createFundTransfer = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://192.168.0.105:8080/createFundTransfer"
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