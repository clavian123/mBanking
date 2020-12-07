import {
    SYNC_STORAGE,
    STORAGE_EMPTY,
    EASY_PIN_LOGIN,
    EASY_PIN_LOGOUT,
    SET_SESSION_INTERVAL
} from '../action/index';

export const syncStorage = (deviceId, isLogin, isEasyPinLogin) => ({
    type: SYNC_STORAGE,
    deviceId,
    isLogin, 
    isEasyPinLogin
})

export const storageEmpty = () => ({
    type: STORAGE_EMPTY
})

export const easyPinLogin = (isEasyPinLogin) => ({
    type: EASY_PIN_LOGIN,
    isEasyPinLogin
})

export const easyPinLogout = () => ({
    type: EASY_PIN_LOGOUT
})