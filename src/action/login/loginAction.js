import { 
    SYNC_STORAGE_BEGIN,
    SYNC_STORAGE_SUCCESS, 
    STORAGE_EMPTY, 
    LOGIN_SUCCESS, 

    LOGOUT, 
    POST_CLIENT_LOGIN_BEGIN, 
    POST_VALIDATE_CLIENT_LOGIN, 
    POST_CLIENT_LOGIN_FAILURE 
} from '../index';

export const syncStorageBegin = () => ({
    type: SYNC_STORAGE_BEGIN,
})

export const syncStorageSuccess = (name, customerId, easyPin) => ({
    type: SYNC_STORAGE_SUCCESS,
    name,
    customerId,
    easyPin
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

export const loginSuccess = (name, customerId, easyPin) => ({
    type: LOGIN_SUCCESS,
    name,
    customerId,
    easyPin
})

export const postClientLoginFailure = (error) => ({
    type: POST_CLIENT_LOGIN_FAILURE,
    error,
})

export const logout = () => ({
    type: LOGOUT
})