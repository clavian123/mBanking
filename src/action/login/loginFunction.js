import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Alert } from "react-native";

import {
  syncStorageBegin,
  syncStorageSuccess,
  storageEmpty,
  postClientLoginBegin,
  postValidateClientLogin,
  loginSuccess,
  postClientLoginFailure,
  logout,
  easyPinLogin,
  easyPinLogout
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

export function handleLogin(name, cif_code, easyPin, email) {
  return dispatch => {
    dispatch(loginSuccess(name, cif_code, easyPin, email));
    syncLoginToStorage(name, cif_code, easyPin);
    dispatch(postValidateClientLogin(true));
  }
};

export function handleLogout() {
  syncLogoutToStorage();
  return dispatch => {
    dispatch(logout());
  }
};

export function loginEasyPin() {
  return dispatch => {
    dispatch(easyPinLogin());
  };
};

export function logoutEasyPin() {
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
  };
};