import {
    SYNC_STORAGE_BEGIN,
    SYNC_STORAGE_SUCCESS,
    STORAGE_EMPTY,
    POST_CLIENT_LOGIN_BEGIN,
    POST_VALIDATE_CLIENT_LOGIN,
    LOGIN_SUCCESS,
    POST_CLIENT_LOGIN_FAILURE,
    LOGOUT
} from '../action/index';

initialState = {
    isLogin: false,
    easyPin: '',
    loading: false,
    error: null,
    name: '',
    customerId: '',
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case SYNC_STORAGE_BEGIN:
            return {
                ...state,
                easyPin: '',
                loading: true,
                accName: '',
                name: '',
                customerId: ''
            };

        case SYNC_STORAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogin: true,
                name: action.name,
                customerId: action.customerId,
                easyPin: action.easyPin
            };

        case STORAGE_EMPTY: 
            return {
                ...state,
                isLogin: false,
                loading: false
            }

        case POST_CLIENT_LOGIN_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

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
                customerId: action.customerId,
            };
        
        case POST_CLIENT_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                accNumber: '',
                pin: ''
            };

        default:
            return state;
    }
};

export default login;