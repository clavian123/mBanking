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
    GET_TRANSACTION_RECOMMENDATION_BEGIN,
    GET_TRANSACTION_RECOMMENDATION_SUCCESS,
    GET_TRANSACTION_RECOMMENDATION_FAILURE
} from '../index';

export const getAccountAndBalanceBegin = () => ({
    type: GET_BALANCE_BEGIN
});

export const getAccountAndBalanceSuccess = (balance) => ({
    type: GET_BALANCE_SUCCESS,
    balance
});

export const getAccountAndBalanceFailure = (error) => ({
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

export const getCustomerDataBegin = () => ({
    type: GET_CUSTOMER_DATA_BEGIN,
})

export const getCustomerDataSuccess = (gender, email) => ({
    type: GET_CUSTOMER_DATA_SUCCESS,
    gender,
    email
})

export const getCustomerDataFailure = (error) => ({
    type: GET_CUSTOMER_DATA_FAILURE,
    error
})

export const getTransactionRecommendationBegin = () => ({
    type: GET_TRANSACTION_RECOMMENDATION_BEGIN
})

export const getTransactionRecommendationSuccess = (transactionRecommendation) => ({
    type: GET_TRANSACTION_RECOMMENDATION_SUCCESS,
    transactionRecommendation
})

export const getTransactionRecommendationFailure = (error) => ({
    type: GET_TRANSACTION_RECOMMENDATION_FAILURE,
    error
})