import {
    SYNC_STORAGE_BEGIN,
    SYNC_STORAGE_SUCCESS,
    STORAGE_EMPTY,
    LOGIN_SUCCESS,
    POST_VALIDATE_CLIENT_LOGIN,
    EASY_PIN_LOGIN,
    LOGOUT
} from '../action/index';

initialState = {
    isLogin: false,
    easyPin: '',
    isEasyPinLogin: false,
    loading: false,
    error: null,
    name: '',
    cif_code: ''
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case SYNC_STORAGE_BEGIN:
            return {
                ...state,
                easyPin: '',
                loading: true,
                name: '',
                cif_code: ''
            };

        case SYNC_STORAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogin: true,
                isEasyPinLogin: true,
                name: action.name,
                cif_code: action.cif_code,
                easyPin: action.easyPin
            };

        case STORAGE_EMPTY: 
            return {
                ...state,
                isLogin: false,
                loading: false
            }

        // case POST_CLIENT_LOGIN_BEGIN:
        //     return {
        //         ...state,
        //         loading: true,
        //         error: null
        //     };

        case POST_VALIDATE_CLIENT_LOGIN:
            return {
                ...state,
                loading: false,
                isLogin: action.isLogin
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                name: action.name,
                cif_code: action.cif_code,
                easyPin: action.easyPin
            };
        
        // case POST_CLIENT_LOGIN_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.error
        //     };

        case EASY_PIN_LOGIN:
            return{
                ...state,
                isEasyPinLogin: action.isEasyPinLogin
            }
        
        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                name: '',
                easyPin: '',
                cif_code: ''
            };

        default:
            return state;
    }
};

export default login;