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
    EMPTY_TARGET_ACCOUNT,
    SET_SOURCE_ACCOUNT_BEGIN,
    SET_SOURCE_ACCOUNT_SUCCESS,
    SET_SOURCE_ACCOUNT_FAILURE,
} from '../index';

export const getBankListBegin = () => ({
    type: GET_BANK_LIST_BEGIN
});

export const getBankListSuccess = (bankList) => ({
    type: GET_BANK_LIST_SUCCESS,
    bankList
});

export const getBankListFailure = (error) => ({
    type: GET_BANK_LIST_FAILURE,
    error
});

export const checkAccountNumberBegin = () => ({
    type: CHECK_ACCOUNT_NUMBER_BEGIN
});

export const checkAccountNumberSuccess = (bankName, accNumber, fullName) => ({
    type: CHECK_ACCOUNT_NUMBER_SUCCESS,
    bankName,
    accNumber,
    fullName
});

export const checkAccountNumberFailure = (error) => ({
    type: CHECK_ACCOUNT_NUMBER_FAILURE,
    error
});

export const emptyAccountNumber = () => ({
    type: EMPTY_TARGET_ACCOUNT
});

export const setSourceAccountSuccess = (accNumber, fullName, balance) => ({
    type: SET_SOURCE_ACCOUNT_SUCCESS,
    accNumber,
    fullName,
    balance
})

export const setSourceAccountFailure = () => ({
    type: SET_SOURCE_ACCOUNT_FAILURE
})

// export const checkClientDestinationBegin = () => ({
//     type: CHECK_CLIENT_DESTINATION_BEGIN
// });

// export const checkClientDestinationSuccess = (account_number) => ({
//     type: CHECK_CLIENT_DESTINATION_SUCCESS,
//     account_number
// });

// export const checkClientDestinationEmpty = () => ({
//     type: CHECK_CLIENT_DESTINATION_EMPTY
// });

// export const checkClientDestinationFailure = (error) => ({
//     type: CHECK_CLIENT_DESTINATION_FAILURE,
//     error
// });

// export const saveClientDestinationBegin = () => ({
//     type: SAVE_CLIENT_DESTINATION_BEGIN
// });

// export const saveClientDestinationSuccess = () => ({
//     type: SAVE_CLIENT_DESTINATION_SUCCESS
// });

// export const saveClientDestinationFailure = (error) => ({
//     type: SAVE_CLIENT_DESTINATION_FAILURE,
//     error
// });

// export const getListClientDestinationBegin = () => ({
//     type: GET_LIST_CLIENT_DESTINATION_BEGIN
// });

// export const getListClientDestinationSuccess = (listDest) => ({
//     type: GET_LIST_CLIENT_DESTINATION_SUCCESS,
//     listDest
// });

// export const getListClientDestinationFailure = (error) => ({
//     type: GET_LIST_CLIENT_DESTINATION_FAILURE,
//     error
// });

// export const getClientTokenBegin = () => ({
//     type: GET_CLIENT_TOKEN_BEGIN
// });

// export const getClientTokenSuccess = (token) => ({
//     type: GET_CLIENT_TOKEN_SUCCESS,
//     token
// });

// export const getClientTokenFailure = (error) => ({
//     type: GET_CLIENT_TOKEN_FAILURE,
//     error
// });

// export const transferProcessBegin = () => ({
//     type: TRANSFER_PROCESS_BEGIN
// });

// export const transferProcessSuccess = () => ({
//     type: TRANSFER_PROCESS_SUCCESS
// });

// export const transferProcessFailure = (error) => ({
//     type: TRANSFER_PROCESS_FAILURE,
//     error
// });

