import {
    GET_BANK_LIST_BEGIN,
    GET_BANK_LIST_SUCCESS,
    GET_BANK_LIST_FAILURE,
    CHECK_ACCOUNT_NUMBER_BEGIN,
    CHECK_ACCOUNT_NUMBER_SUCCESS,
    CHECK_ACCOUNT_NUMBER_FAILURE,
    EMPTY_TARGET_ACCOUNT,
    SET_TRANSFER_AMOUNT,
    SET_TRANSFER_NOTE,
    SET_SOURCE_ACCOUNT_SUCCESS,
    GET_METHOD_LIST_BEGIN,
    GET_METHOD_LIST_SUCCESS,
    GET_METHOD_LIST_FAILURE,
    SET_SEND_METHOD,
    CLEAR_SEND_METHOD,
    GET_LIST_DEST_BEGIN,
    GET_LIST_DEST_SUCCESS,
    GET_LIST_DEST_FAILURE,
    GET_TRANSFER_TOKEN_BEGIN,
    GET_TRANSFER_TOKEN_SUCCESS,
    GET_TRANSFER_TOKEN_FAILURE,
    VALIDATE_TRANSFER_TOKEN_BEGIN,
    VALIDATE_TRANSFER_TOKEN_SUCCESS,
    VALIDATE_TRANSFER_TOKEN_FAILURE,
    SAVE_NEW_TARGET_ACCOUNT_BEGIN,
    SAVE_NEW_TARGET_ACCOUNT_SUCCESS,
    SAVE_NEW_TARGET_ACCOUNT_FAILURE,
    TRANSFER_BEGIN,
    TRANSFER_SUCCESS,
    TRANSFER_FAILURE,
} from '../action/index';

initialState = {
    destAcc: {
        bankCode: '',
        bankName: 'Bank Name or Code',
        accNumber: '',
        fullName: '',
    },
    sourceAcc:{
        accNumber:'',
        fullName: '',
        balance: ''
    },
    amount: '',
    note: '',
    methodList: '',
    sendMethod: {
        id: '',
        name: '',
        fee: '',
    },
    transactionDetail: '',
    listDest: [],
    bankList: [],
    loading: false,
    error: null,
    validateOtp: '',
    saveNewTargetAccount: false
};

const transfer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BANK_LIST_BEGIN: 
            return {
                ...state,
                loading: true
            };

        case GET_BANK_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                bankList: action.bankList
            };
        
        case GET_BANK_LIST_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.error
            };
        
        case CHECK_ACCOUNT_NUMBER_BEGIN:
            return {
                ...state,
                loading: true
            }

        case CHECK_ACCOUNT_NUMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                destAcc: {
                    bankCode: action.bankCode,
                    bankName: action.bankName,
                    accNumber: action.accNumber,
                    fullName: action.fullName
                }
            }

        case CHECK_ACCOUNT_NUMBER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case EMPTY_TARGET_ACCOUNT:
            return {
                ...state,
                loading: false,
                destAcc: {
                    bankName: 'Bank Name or Code',
                    accNumber: '',
                    fullName: ''
                }
            }

        case SET_TRANSFER_AMOUNT:
            return{
                ...state,
                loading: false,
                amount: action.amount
            }

        case SET_TRANSFER_NOTE:
            return {
                ...state,
                loading: false,
                note: action.note
            }

        case SET_SOURCE_ACCOUNT_SUCCESS:
            return{
                ...state,
                sourceAcc: {
                    accNumber: action.accNumber,
                    fullName: action.fullName,
                    balance: action.balance,
                },
                loading: false,
            }

        case GET_METHOD_LIST_BEGIN:
            return{
                ...state,
                loading: true
            }

        case GET_METHOD_LIST_SUCCESS:
            return{
                ...state,
                loading: false,
                methodList: action.methodList
            }

        case GET_METHOD_LIST_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error
            }

        case SET_SEND_METHOD: 
            return{
                ...state,
                sendMethod: {
                    id: action.id,
                    name: action.name,
                    fee: action.fee,
                }
            }

        case CLEAR_SEND_METHOD:
            return{
                ...state,
                sendMethod: {
                    id: '',
                    name: '',
                    fee: '',
                }
            }

        case GET_LIST_DEST_BEGIN:
            return{
                ...state,
                loading: true
            }

        case GET_LIST_DEST_SUCCESS:
            return {
                ...state,
                loading: false,
                listDest: action.listDest
            }

        case GET_LIST_DEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case GET_TRANSFER_TOKEN_BEGIN:
            return {
                ...state,
                loading: true
            }

        case GET_TRANSFER_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case GET_TRANSFER_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case VALIDATE_TRANSFER_TOKEN_BEGIN:
            return {
                ...state,
                loading: true,
            }

        case VALIDATE_TRANSFER_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                validateOtp: action.validateOtp
            }

        case VALIDATE_TRANSFER_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case SAVE_NEW_TARGET_ACCOUNT_BEGIN:
            return {
                ...state,
                loading: true
            }

        case SAVE_NEW_TARGET_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                saveNewTargetAccount: action.saveNewTargetAccount
            }

        case SAVE_NEW_TARGET_ACCOUNT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                saveNewTargetAccount: false
            }

        case TRANSFER_BEGIN:
            return{
                ...state,
                loading: true,
                saveNewTargetAccount: false
            }

        case TRANSFER_SUCCESS:
            return{
                ...state,
                loading: false,
                transactionDetail: action.transactionDetail,
                validateOtp: false
            }

        case TRANSFER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state;
    }
};

export default transfer;