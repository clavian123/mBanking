import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { 
    syncStorageBegin,
    syncStorageSuccess, 
    storageEmpty, 
    postClientLoginBegin, 
    postValidateClientLogin, 
    loginSuccess, 
    postClientLoginFailure, 
    logout 
} from './loginAction';
import { syncLoginToStorage, syncLogoutToStorage } from '../../Auth'

const CLIENT_ACC_NUMBER = 'CLIENT_ACC_NUMBER'
const CLIENT_PIN = 'CLIENT_PIN'

export function handleSyncStorage() {
    return async dispatch => {
        dispatch(syncStorageBegin());
        var accNumber = await AsyncStorage.getItem(CLIENT_ACC_NUMBER);
        var pin = await AsyncStorage.getItem(CLIENT_PIN);
        if (accNumber != null && pin != null) {
            dispatch(syncStorageSuccess(accNumber, pin));
        } else {
            dispatch(storageEmpty());
        }
    }
};

export function handleLogin(accNumber, pin) {
    let clientLogin = {
        accNumber: accNumber,
        pin: pin
    };
    let address = "http://localhost:8080/validateLogin";
    return dispatch => {
        dispatch(postClientLoginBegin());
        return axios.post(address, clientLogin).then(
            (res) => {
                dispatch(postValidateClientLogin(res.data));
                if (res.data) {
                    dispatch(loginSuccess(accNumber, pin));
                    syncLoginToStorage(accNumber, pin);
                } else {
                    alert('Your account number or PIN is wrong!');
                }
            }, (error) => {
                console.log(error);
                dispatch(postClientLoginFailure(error));
            }   
        )
    }
};

export function handleLogout() {
    syncLogoutToStorage();
    return dispatch => {
        dispatch(logout());
    }
};

