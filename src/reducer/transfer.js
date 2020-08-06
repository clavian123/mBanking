import {
    GET_BANK_LIST_BEGIN,
    GET_BANK_LIST_SUCCESS,
    GET_BANK_LIST_FAILURE,
    CHECK_ACCOUNT_NUMBER_BEGIN,
    CHECK_ACCOUNT_NUMBER_SUCCESS,
    CHECK_ACCOUNT_NUMBER_FAILURE,
    EMPTY_TARGET_ACCOUNT
} from '../action/index';

initialState = {
    destAcc: {
        bankCode: '',
        bankName: 'Bank Name or Code',
        accNumber: '',
        fullName: '',
    },
    token: '',
    listDest: [],
    bankList: [],
    loading: false,
    error: null
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
        
        default:
            return state;
    }
};

export default transfer;