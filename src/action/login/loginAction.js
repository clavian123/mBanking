import { 
    SYNC_STORAGE_BEGIN,
    SYNC_STORAGE_SUCCESS, 
    STORAGE_EMPTY,  
    LOGIN_SUCCESS,
    LOGOUT, 
    POST_VALIDATE_CLIENT_LOGIN, 
    EASY_PIN_LOGIN,
    POST_CLIENT_LOGIN_BEGIN
} from '../index';

export const syncStorageBegin = () => ({
    type: SYNC_STORAGE_BEGIN,
})

export const syncStorageSuccess = (name, cif_code, easyPin) => ({
    type: SYNC_STORAGE_SUCCESS,
    name,
    cif_code,
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
});

export const easyPinLogin = (isEasyPinLogin) => ({
    type: EASY_PIN_LOGIN,
    isEasyPinLogin
});


export const loginSuccess = (name, cif_code, easyPin) => ({
    type: LOGIN_SUCCESS,
    name,
    cif_code,
    easyPin
});

export const postClientLoginFailure = (error) => ({
    type: POST_CLIENT_LOGIN_FAILURE,
    error,
});

export const logout = () => ({
    type: LOGOUT
});