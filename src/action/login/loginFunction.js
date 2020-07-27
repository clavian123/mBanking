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
const NAME = 'NAME'
const CUSTOMER_CIF_CODE = 'CUSTOMER_CIF_CODE'

export function handleSyncStorage() {
    return async dispatch => {
        dispatch(syncStorageBegin());
        // var accNumber = await AsyncStorage.getItem(CLIENT_ACC_NUMBER);
        // var pin = await AsyncStorage.getItem(CLIENT_PIN);
        var name = await AsyncStorage.getItem(NAME);
        var cif_code = await AsyncStorage.getItem(CUSTOMER_CIF_CODE);
        if (name != null && cif_code != null) {
            dispatch(syncStorageSuccess(name, cif_code));
        } else {
            dispatch(storageEmpty());
        }
    }
};

export function handleLogin(username, password) {
    let userLogin = {
        username: username,
        password: password,
    };
    let address = "http://localhost:8080/login";
    return dispatch => {
        dispatch(postClientLoginBegin());
        return axios.post(address, userLogin).then(
            (res) => {
                if (res.data != "") {
                    console.log(res.data.customer.cifCode)
                    dispatch(loginSuccess(res.data.name, res.data.customer.cifCode));
                    syncLoginToStorage(res.data.name, res.data.customer.cifCode);
                    dispatch(postValidateClientLogin(true));
                } else {
                    alert('Your Username or Password is wrong!');
                    dispatch(postClientLoginFailure('Your Username or Password is wrong!'));
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

