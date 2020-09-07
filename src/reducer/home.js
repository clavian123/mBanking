import {
    GET_BALANCE_BEGIN,
    GET_BALANCE_SUCCESS,
    GET_BALANCE_FAILURE,
    GET_ACCOUNT_STATEMENT_BEGIN,
    GET_ACCOUNT_STATEMENT_SUCCESS,
    GET_ACCOUNT_STATEMENT_FAILURE,
    GET_CUSTOMER_DATA_BEGIN,
    GET_CUSTOMER_DATA_SUCCESS,
    GET_CUSTOMER_DATA_FAILURE,
} from '../action/index';

initialState = {
    balance: '',
    statements: [],
    loading: false,
    error: null,
    gender: '',
    email:'',
};

const home = (state = initialState, action) => {
    switch(action.type) {
        case GET_BALANCE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_BALANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                balance: action.balance
            };

        case GET_BALANCE_FAILURE:
            return {
                ...state,
                loading: false,
                balance: '',
                error: action.error
            };

        case GET_ACCOUNT_STATEMENT_BEGIN:
            return {
                ...state,
                statements: [],
                loading: true,
                error: null
            };

        case GET_ACCOUNT_STATEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                statements: action.statements
            };

        case GET_ACCOUNT_STATEMENT_FAILURE:
            return {
                ...state,
                loading: false,
                statements: [],
                error: action.error
            };

        case GET_CUSTOMER_DATA_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case GET_CUSTOMER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                email: action.email,
                gender: action.gender
            };

        case GET_CUSTOMER_DATA_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
};

export default home;