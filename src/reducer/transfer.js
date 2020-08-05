import {
    // CHECK_CLIENT_DESTINATION_BEGIN,
    // CHECK_CLIENT_DESTINATION_SUCCESS,
    // CHECK_CLIENT_DESTINATION_EMPTY,
    // CHECK_CLIENT_DESTINATION_FAILURE,
    // SAVE_CLIENT_DESTINATION_BEGIN,
    // SAVE_CLIENT_DESTINATION_SUCCESS,
    // SAVE_CLIENT_DESTINATION_FAILURE,
    // GET_LIST_CLIENT_DESTINATION_BEGIN,
    // GET_LIST_CLIENT_DESTINATION_SUCCESS,
    // GET_LIST_CLIENT_DESTINATION_FAILURE,
    // GET_CLIENT_TOKEN_BEGIN,
    // GET_CLIENT_TOKEN_SUCCESS,
    // GET_CLIENT_TOKEN_FAILURE,
    // TRANSFER_PROCESS_BEGIN,
    // TRANSFER_PROCESS_SUCCESS,
    // TRANSFER_PROCESS_FAILURE,
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
        
        // case CHECK_CLIENT_DESTINATION_BEGIN:
        //     return {
        //         ...state,
        //         newDest: {
        //             accNumber: '',
        //             fullName: ''
        //         },
        //         loading: true
        //     };

        // case CHECK_CLIENT_DESTINATION_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         newDest: {
        //             accNumber: action.accNumber,
        //             fullName: action.fullName
        //         }
        //     };

        // case CHECK_CLIENT_DESTINATION_EMPTY:
        //     return {
        //         ...state,
        //         loading: false,
        //         newDest: {
        //             accNumber: '',
        //             fullName: ''
        //         },
        //     };

        // case CHECK_CLIENT_DESTINATION_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         newDest: {
        //             accNumber: '',
        //             fullName: ''
        //         },
        //         error: action.error
        //     };

        // case SAVE_CLIENT_DESTINATION_BEGIN:
        //     return {
        //         ...state,
        //         loading: true,
        //     };

        // case SAVE_CLIENT_DESTINATION_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: null
        //     };

        // case SAVE_CLIENT_DESTINATION_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.error
        //     };

        // case GET_LIST_CLIENT_DESTINATION_BEGIN:
        //     return {
        //         ...state,
        //         loading: true
        //     };

        // case GET_LIST_CLIENT_DESTINATION_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: null,
        //         listDest: action.listDest
        //     };

        // case GET_LIST_CLIENT_DESTINATION_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.error,
        //         listDest: []
        //     };
        
        // case GET_CLIENT_TOKEN_BEGIN:
        //     return {
        //         ...state,
        //         loading: true
        //     }
        
        // case GET_CLIENT_TOKEN_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         token: action.token,
        //         error: null
        //     }

        // case GET_CLIENT_TOKEN_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         token: '',
        //         error: action.error
        //     }

        // case TRANSFER_PROCESS_BEGIN:
        //     return {
        //         ...state,
        //         loading: true
        //     };

        // case TRANSFER_PROCESS_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: null,
        //     };

        // case TRANSFER_PROCESS_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.error
        //     };
        
        default:
            return state;
    }
};

export default transfer;