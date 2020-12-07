import {
    SYNC_STORAGE,
    STORAGE_EMPTY,
    EASY_PIN_LOGIN,
    EASY_PIN_LOGOUT
} from '../action/index';

initialState = {
    deviceId: '',
    isLogin: false,
    isEasyPinLogin: false
}

const newLogin = (state = initialState, action) => {
    switch(action.type) {
        case SYNC_STORAGE: 
            return {
                deviceId: action.deviceId,
                isLogin: action.isLogin,
                isEasyPinLogin: action.isEasyPinLogin
            }

        case STORAGE_EMPTY:
            return {
                deviceId: '',
                isLogin: false,
                isEasyPinLogin: false
            }

        case EASY_PIN_LOGIN:
            return {
                ...state,
                isEasyPinLogin: action.isEasyPinLogin
            }
        
        case EASY_PIN_LOGOUT:
            return {
                ...state,
                isEasyPinLogin: false
            }
        
        default:
            return state;

    }
}

export default newLogin;