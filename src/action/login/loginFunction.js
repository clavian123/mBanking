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
    logout,
} from './loginAction';
import { syncLoginToStorage, syncLogoutToStorage } from '../../Auth'

const NAME = 'NAME'
const CUSTOMER_ID = 'CUSTOMER_ID'
const EASY_PIN = 'EASY_PIN'

export function handleSyncStorage() {
    return async dispatch => {
        dispatch(syncStorageBegin());
        var name = await AsyncStorage.getItem(NAME);
        var customerId = await AsyncStorage.getItem(CUSTOMER_ID);
        var easyPin = await AsyncStorage.getItem(EASY_PIN);
        if (name != null && customerId != null && easyPin != null) {
            dispatch(syncStorageSuccess(name, customerId, easyPin));
        } else {
            dispatch(storageEmpty());
        }
    }
};

export function login(username, password) {
    let req = {
        username: username,
        password: password
    };
    let address = "http://192.168.0.103:8080/login/";

    return dispatch => {
        dispatch(postClientLoginBegin());
        return axios.post(address, req).then(
            (res) => {
                if(res.data != ""){
                    console.log(res.data)
                    dispatch(loginSuccess(res.data.name, res.data.customer.id));
                } else {
                    alert('Your username or password is wrong');
                    dispatch(postClientLoginFailure('Your username or password is wrong'));
                }
            }, (error) => {
                console.log(error);
                dispatch(postClientLoginFailure(error));
            }
        )
    }
}

export function handleLogin(username, password, easyPin) {
    let userLogin = {
        username: username,
        password: password,
    };
    let address = "http://192.168.0.103:8080/login/";
    return dispatch => {
        dispatch(postClientLoginBegin());
        return axios.post(address, userLogin).then(
            (res) => {
                if (res.data != "") {
                    console.log(res.data)
                    dispatch(loginSuccess(res.data.name, res.data.customer.id, easyPin));
                    syncLoginToStorage(res.data.name, res.data.customer.id, easyPin);
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

