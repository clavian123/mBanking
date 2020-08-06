import {
    GET_BANK_LIST_BEGIN,
    GET_BANK_LIST_SUCCESS,
    GET_BANK_LIST_FAILURE,
    CHECK_ACCOUNT_NUMBER_BEGIN,
    CHECK_ACCOUNT_NUMBER_SUCCESS,
    CHECK_ACCOUNT_NUMBER_FAILURE,
    EMPTY_TARGET_ACCOUNT
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

