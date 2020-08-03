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
const CUSTOMER_CIF_CODE = 'CUSTOMER_CIF_CODE'
const EASY_PIN = 'EASY_PIN'

export function handleSyncStorage() {
    return async dispatch => {
        dispatch(syncStorageBegin());
        var name = await AsyncStorage.getItem(NAME);
        var cif_code = await AsyncStorage.getItem(CUSTOMER_CIF_CODE);
        var easyPin = await AsyncStorage.getItem(EASY_PIN);
        if (name != null && cif_code != null && easyPin != null) {
            dispatch(syncStorageSuccess(name, cif_code, easyPin));
        } else {
            dispatch(storageEmpty());
        }
    }
};

export function handleLogin(name, cif_code, easyPin) {
    return dispatch => {
        dispatch(postClientLoginBegin());
        return axios.post(address, userLogin).then(
            (res) => {
                if (res.data != "") {
                    // console.log(res.data.customer.cifCode)
                    dispatch(loginSuccess(name, cif_code, easyPin));
                    syncLoginToStorage(name, cif_code, easyPin);
                    dispatch(postValidateClientLogin(true));
                } else {
                    alert('Your Username or Password is wrong!');
                    dispatch(postClientLoginFailure('Your Username or Password is wrong!'));
                }
            }, (error) => {
                console.log(error);
                alert('Your Username or Password is wrong!');
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

