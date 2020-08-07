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
    CLEAR_SEND_METHOD
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

export const setSendMethod = (sendMethod) => ({
    type: SET_SEND_METHOD,
    sendMethod
});

export const clearSendMethod = () => ({
    type: CLEAR_SEND_METHOD
});