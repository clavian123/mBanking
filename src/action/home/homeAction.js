import {
    GET_BALANCE_BEGIN,
    GET_BALANCE_SUCCESS,
    GET_BALANCE_FAILURE,
    GET_ACCOUNT_STATEMENT_BEGIN,
    GET_ACCOUNT_STATEMENT_SUCCESS,
    GET_ACCOUNT_STATEMENT_FAILURE,
} from '../index';

export const getBalanceBegin = () => ({
    type: GET_BALANCE_BEGIN
});

export const getBalanceSuccess = (balance) => ({
    type: GET_BALANCE_SUCCESS,
    balance
});

export const getBalanceFailure = (error) => ({
    type: GET_BALANCE_FAILURE,
    error
});

export const getAccountStatementBegin = () => ({
    type: GET_ACCOUNT_STATEMENT_BEGIN
});

export const getAccountStatementSuccess = (statements) => ({
   type: GET_ACCOUNT_STATEMENT_SUCCESS,
   statements 
});

export const getAccountStatementFailure = (error) => ({
    type: GET_ACCOUNT_STATEMENT_FAILURE,
    error
});