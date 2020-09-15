import { 
    CHECK_PAYMENT_ACCOUNT_NUMBER_BEGIN,
    CHECK_PAYMENT_ACCOUNT_NUMBER_SUCCESS,
    CHECK_PAYMENT_ACCOUNT_NUMBER_FAILURE,
    SET_PAYMENT_SOURCE_ACCOUNT,
    SET_PAYMENT_AMOUNT,
    GET_PAYMENT_TRANS_CHARGE_BEGIN,
    GET_PAYMENT_TRANS_CHARGE_SUCCESS,
    GET_PAYMENT_TRANS_CHARGE_FAILURE,
    PAYMENT_BEGIN,
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE,
} from '../index';

export const checkPaymentAccountNumberBegin = () => ({
    type: CHECK_PAYMENT_ACCOUNT_NUMBER_BEGIN,
})

export const checkPaymentAccountNumberSuccess = (merchantCode, merchantName, accNumber, accName, amount) => ({
    type: CHECK_PAYMENT_ACCOUNT_NUMBER_SUCCESS,
    merchantCode,
    merchantName,
    accNumber,
    accName,
    amount,
})

export const checkPaymentAccountNumberFailure = (error) => ({
    type: CHECK_PAYMENT_ACCOUNT_NUMBER_FAILURE,
    error,
})

export const setPaymentSourceAccount = (accNumber, fullName, balance) => ({
    type: SET_PAYMENT_SOURCE_ACCOUNT,
    accNumber,
    fullName,
    balance,
})

export const setPaymentAmount = (amount) => ({
    type: SET_PAYMENT_AMOUNT,
    amount,
})

export const getPaymentTransChargeBegin = () => ({
    type: GET_PAYMENT_TRANS_CHARGE_BEGIN,
})

export const getPaymentTransChargeSuccess = (merchantCode, merchantName, accNumber, accName, bankCharge) => ({
    type: GET_PAYMENT_TRANS_CHARGE_SUCCESS,
    merchantCode,
    merchantName,
    accNumber,
    accName,
    bankCharge,
})

export const getPaymentTransChargeFailure = (error) => ({
    type: GET_PAYMENT_TRANS_CHARGE_FAILURE,
    error
})

export const billPaymentBegin = () => ({
    type: PAYMENT_BEGIN,
})

export const billPaymentSuccess = (transactionDetail) => ({
    type: PAYMENT_SUCCESS,
    transactionDetail,
})

export const billPaymentFailure = (error) => ({
    type: PAYMENT_FAILURE,
    error
})