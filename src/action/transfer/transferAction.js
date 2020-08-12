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
    SET_DESTINATION_ACCOUNT_SUCCESS,
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

export const checkAccountNumberSuccess = (bankCode, bankName, accNumber, fullName) => ({
    type: CHECK_ACCOUNT_NUMBER_SUCCESS,
    bankCode,
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

export const setTransferAmount = (amount) => ({
    type: SET_TRANSFER_AMOUNT,
    amount
});

export const setTransferNote = (note) => ({
    type: SET_TRANSFER_NOTE,
    note
});

export const setSourceAccountSuccess = (accNumber, fullName, balance) => ({
    type: SET_SOURCE_ACCOUNT_SUCCESS,
    accNumber,
    fullName,
    balance
});

export const setDestinationAccountSuccess = (bankCode, bankName, accNumber, fullName) => ({
    type: SET_DESTINATION_ACCOUNT_SUCCESS,
    bankCode,
    bankName,
    accNumber,
    fullName
});

export const getMethodListBegin = () => ({
    type: GET_METHOD_LIST_BEGIN
});

export const getMethodListSuccess = (methodList) => ({
    type: GET_METHOD_LIST_SUCCESS,
    methodList
});

export const getMethodListFailure = (error) => ({
    type: GET_METHOD_LIST_FAILURE,
    error
});

export const setSendMethod = (id, name, fee) => ({
    type: SET_SEND_METHOD,
    id,
    name,
    fee,
});

export const clearSendMethod = () => ({
    type: CLEAR_SEND_METHOD
});

export const getListDestBegin = () => ({
    type: GET_LIST_DEST_BEGIN
})

export const getListDestSuccess = (listDest) => ({
    type: GET_LIST_DEST_SUCCESS,
    listDest,
})

export const getListdestFailure = (error) => ({
    type: GET_LIST_DEST_FAILURE,
    error
})

export const getTransferTokenBegin = () => ({
    type: GET_TRANSFER_TOKEN_BEGIN
})

export const getTransferTokenSuccess = () => ({
    type: GET_TRANSFER_TOKEN_SUCCESS
})

export const getTransferTokenFailure = (error) => ({
    type: GET_TRANSFER_TOKEN_FAILURE,
    error
})

export const validateTransferTokenBegin = () => ({
    type: VALIDATE_TRANSFER_TOKEN_BEGIN
})

export const validateTransferTokenSuccess = (validateOtp) => ({
    type: VALIDATE_TRANSFER_TOKEN_SUCCESS,
    validateOtp
})

export const validateTransferTokenFailure = (error) => ({
    type: VALIDATE_TRANSFER_TOKEN_FAILURE,
    error
})

export const saveNewTargetAccountBegin = () => ({
    type: SAVE_NEW_TARGET_ACCOUNT_BEGIN
})

export const saveNewTargetAccountSuccess = (saveNewTargetAccount) => ({
    type: SAVE_NEW_TARGET_ACCOUNT_SUCCESS,
    saveNewTargetAccount
})

export const saveNewTargetAccountFailure = (error) => ({
    type: SAVE_NEW_TARGET_ACCOUNT_FAILURE,
    error
})

export const transferBegin = () => ({
    type: TRANSFER_BEGIN
})

export const transferSuccess = (transactionDetail) => ({
    type: TRANSFER_SUCCESS,
    transactionDetail
})

export const transferFailure = (error) => ({
    type: TRANSFER_FAILURE,
    error
})