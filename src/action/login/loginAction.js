import { 
    SYNC_STORAGE, 
    STORAGE_EMPTY, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    POST_CLIENT_LOGIN_BEGIN, 
    POST_VALIDATE_CLIENT_LOGIN, 
    POST_CLIENT_LOGIN_FAILURE 
} from '../index';

export const syncStorage = (accNumber, pin) => ({
    type: SYNC_STORAGE,
    accNumber,
    pin,
})

export const storageEmpty = () => ({
    type: STORAGE_EMPTY
});

export const postClientLoginBegin = () => ({
    type: POST_CLIENT_LOGIN_BEGIN
});

export const postValidateClientLogin = (isLogin) => ({
    type: POST_VALIDATE_CLIENT_LOGIN,
    isLogin,
})

export const loginSuccess = (accNumber, pin) => ({
    type: LOGIN_SUCCESS,
    accNumber,
    pin
})

export const postClientLoginFailure = (error) => ({
    type: POST_CLIENT_LOGIN_FAILURE,
    error,
})

export const logout = () => ({
    type: LOGOUT
})