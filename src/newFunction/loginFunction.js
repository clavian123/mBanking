import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

import {
    setLoading
} from './loadingAction';

import {
    syncStorage,
    storageEmpty,
    easyPinLogin,
    easyPinLogout
} from './loginAction';

import {
    syncLoginToStorage,
    syncLogoutToStorage
} from '../Auth';
import { Alert } from 'react-native';

const DEVICE_ID = 'DEVICE_ID'

export const usernameLogin = (username, password) => {
    let req = {
        username: username,
        password: password
    }
    let address = "http://localhost:8080/usernameLogin";
    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(address, req);
            dispatch(setLoading(false))
            return await res.data;
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const sendLoginOTP = () => {
    let address = "http://localhost:8080/sendLoginOTP";
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

export const getUserEmail = () => {
    let address = "http://localhost:8080/getUserEmail";
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

export const validateLoginOTP = (token) => {
    let req = {
        token: token
    }
    let address = "http://localhost:8080/validateLoginOTP";
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

export const checkUserLogin = () => {
    let address = "http://localhost:8080/checkUserLoginExist";
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

export const createUserLogin = (deviceId, easyPin) => {
    let req = {
        device_id: deviceId,
        easy_pin: easyPin
    }
    let address = "http://localhost:8080/createNewUserLogin";
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

export const handleSyncStorage = () => {
    return async dispatch => {
        var deviceId = await AsyncStorage.getItem(DEVICE_ID);
        if( deviceId != null ) {
            dispatch(syncStorage(deviceId, true, await validateEasyPinLogin(deviceId)));
        } else {
            dispatch(storageEmpty());
        }
    }
}

export const handleLogin = (deviceId) => {
    return dispatch => {
        dispatch(syncStorage(deviceId, true, true));
        syncLoginToStorage(deviceId);
    }
}

export const validateEasyPinLogin = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://localhost:8080/validateEasyPinLogin";
    return async dispatch => {
        try { 
            const res = await axios.post(address, req);
            dispatch(easyPinLogin(await res.data));
            return await res.data;
        } catch {
        }
    }
}

export const loginEasyPin = (device_id, easy_pin) => {
    let req = {
        device_id: device_id,
        easy_pin: easy_pin
    }
    let address = "http://localhost:8080/easyPinLogin";
    return async dispatch => {
        dispatch(setLoading(true));
        try{
            const res = await axios.post(address, req);
            dispatch(setLoading(false))
            dispatch(easyPinLogin(await res.data));
            return await res.data;
        } catch {
            dispatch(setLoading(false))
        }
    }
}

export const refreshEasyPinLogin = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://localhost:8080/refreshEasyPinLogin"
    return async dispatch => {
        try {
            const res = await axios.post(address, req)
            return await res.data;
        } catch {

        }
    }
}

export const logoutEasyPin = () => {
    return dispatch => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to Logout?",
            [
              {
                text: "YES",
                onPress: () => {
                  dispatch(easyPinLogout());
                }
              },
              {
                text: "CANCEL"
              }
            ]
        );
    }
}

export const handleLogout = (device_id) => {
    let req = {
        device_id: device_id
    }
    let address = "http://localhost:8080/logout";
    syncLogoutToStorage();
    return dispatch => {
        dispatch(setLoading(true));
        return axios.post(address, req).then(
            (res) => {
                dispatch(setLoading(false));
                dispatch(storageEmpty());
            }, (error) => {
                dispatch(setLoading(false));
                console.log(error);
            }
        )
        dispatch(storageEmpty());
    }
}