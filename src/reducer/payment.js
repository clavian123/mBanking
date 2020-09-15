import {
    CHECK_PAYMENT_ACCOUNT_NUMBER_BEGIN,
    CHECK_PAYMENT_ACCOUNT_NUMBER_SUCCESS,
    CHECK_PAYMENT_ACCOUNT_NUMBER_FAILURE,
    SET_PAYMENT_SOURCE_ACCOUNT,
    GET_PAYMENT_TRANS_CHARGE_BEGIN,
    GET_PAYMENT_TRANS_CHARGE_SUCCESS,
    GET_PAYMENT_TRANS_CHARGE_FAILURE,
    GET_PAYMENT_TOKEN_BEGIN,
    GET_PAYMENT_TOKEN_SUCCESS,
    GET_PAYMENT_TOKEN_FAILURE,
    VALIDATE_PAYMENT_TOKEN_BEGIN,
    VALIDATE_PAYMENT_TOKEN_SUCCESS,
    VALIDATE_PAYMENT_TOKEN_FAILURE,
    SAVE_NEW_TARGET_SUBSCRIBER_BEGIN,
    SAVE_NEW_TARGET_SUBSCRIBER_SUCCESS,
    SAVE_NEW_TARGET_SUBSCRIBER_FAILURE,
    PAYMENT_BEGIN,
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE,
    SET_PAYMENT_AMOUNT,
} from '../action/index';

initialState = {
    amount: '',
    targetSubs:{
        merchantCode: '',
        merchantName: '',
        accNumber: '',
        accName: '',
        bankCharge: '',
    },
    sourceAcc:{
        accNumber:'',
        fullName: '',
        balance: ''
    },
    transactionDetail: '',
    validateOtp: false,
    loading: false,
    error: null,
}

const payment = (state = initialState, action) =>{
    switch(action.type) {
        case CHECK_PAYMENT_ACCOUNT_NUMBER_BEGIN:
            return {
                ...state,
                loading: true
            };

        case CHECK_PAYMENT_ACCOUNT_NUMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                targetSubs:{
                    merchantCode: action.merchantCode,
                    merchantName: action.merchantName,
                    accNumber: action.accNumber,
                    accName: action.accName,
                },
                amount: action.amount,
            };

        case CHECK_PAYMENT_ACCOUNT_NUMBER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case SET_PAYMENT_SOURCE_ACCOUNT:
            return {
                ...state,
                loading: false,
                sourceAcc: {
                    accNumber: action.accNumber,
                    fullName: action.fullName,
                    balance: action.balance,
                },
            }
            
        case SET_PAYMENT_AMOUNT:
            return {
                ...state,
                loading: false,
                amount: action.amount
            }

        case GET_PAYMENT_TRANS_CHARGE_BEGIN:
            return {
                ...state,
                loading: false,
            }

        case GET_PAYMENT_TRANS_CHARGE_SUCCESS:
            return {
                ...state,
                loading: false,
                targetSubs:{
                    merchantCode: action.merchantCode,
                    merchantName: action.merchantName,
                    accNumber: action.accNumber,
                    accName: action.accName,
                    bankCharge: action.bankCharge
                }
            }

        case GET_PAYMENT_TRANS_CHARGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case PAYMENT_BEGIN:
            return {
                ...state,
                loading: true
            }
        
        case PAYMENT_SUCCESS:
            return {
                ...state,
                transactionDetail: action.transactionDetail,
                loading: false,
            }

        case PAYMENT_FAILURE:
            return {
                ...state,
                error: action.error
            }

        default:
            return state;
    }
};

export default payment;