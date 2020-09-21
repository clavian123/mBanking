import { 
    GET_TARGET_SUBSCRIBER_LIST_BEGIN,
    GET_TARGET_SUBSCRIBER_LIST_SUCCESS,
    GET_TARGET_SUBSCRIBER_LIST_FAILURE,
    DELETE_TARGET_SUBSCRIBER_BEGIN,
    DELETE_TARGET_SUBSCRIBER_SUCCESS,
    DELETE_TARGET_SUBSCRIBER_FAILURE,
    CHECK_PAYMENT_ACCOUNT_NUMBER_BEGIN,
    CHECK_PAYMENT_ACCOUNT_NUMBER_SUCCESS,
    CHECK_PAYMENT_ACCOUNT_NUMBER_FAILURE,
    SET_PAYMENT_SOURCE_ACCOUNT,
    SET_PAYMENT_AMOUNT,
    GET_PAYMENT_TRANS_CHARGE_BEGIN,
    GET_PAYMENT_TRANS_CHARGE_SUCCESS,
    GET_PAYMENT_TRANS_CHARGE_FAILURE,
    SAVE_NEW_TARGET_SUBSCRIBER_BEGIN,
    SAVE_NEW_TARGET_SUBSCRIBER_SUCCESS,
    SAVE_NEW_TARGET_SUBSCRIBER_FAILURE,
    GET_PAYMENT_TOKEN_BEGIN,
    GET_PAYMENT_TOKEN_SUCCESS,
    GET_PAYMENT_TOKEN_FAILURE,
    VALIDATE_PAYMENT_TOKEN_BEGIN,
    VALIDATE_PAYMENT_TOKEN_SUCCESS,
    VALIDATE_PAYMENT_TOKEN_FAILURE,
    PAYMENT_BEGIN,
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE
} from '../index';

export const getTargetSubscriberListBegin = () => ({
    type: GET_TARGET_SUBSCRIBER_LIST_BEGIN
})

export const getTargetSubscriberListSuccess = (targetSubscriberList) => ({
    type: GET_TARGET_SUBSCRIBER_LIST_SUCCESS,
    targetSubscriberList
})

export const getTargetSubscriberListFailure = (error) => ({
    type: GET_TARGET_SUBSCRIBER_LIST_FAILURE,
    error
})

export const deleteTargetSubscriberBegin = () => ({
    type: DELETE_TARGET_SUBSCRIBER_BEGIN
})

export const deleteTargetSubscriberSuccess = () => ({
    type: DELETE_TARGET_SUBSCRIBER_SUCCESS
})

export const deleteTargetSubscriberFailure = (error) => ({
    type: DELETE_TARGET_SUBSCRIBER_FAILURE,
    error
})

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

export const saveNewTargetSubscriberBegin = () => ({
    type: SAVE_NEW_TARGET_SUBSCRIBER_BEGIN
})

export const saveNewTargetSubscriberSuccess = () => ({
    type: SAVE_NEW_TARGET_SUBSCRIBER_SUCCESS
})

export const saveNewTargetSubscriberFailure = (error) => ({
    type: SAVE_NEW_TARGET_SUBSCRIBER_FAILURE,
    error
})

export const getPaymentTokenBegin = () => ({
    type: GET_PAYMENT_TOKEN_BEGIN
})

export const getPaymentTokenSuccess = () => ({
    type: GET_PAYMENT_TOKEN_SUCCESS
})

export const getPaymentTokenFailure = (error) => ({
    type: GET_PAYMENT_TOKEN_FAILURE,
    error
})

export const validatePaymentTokenBegin = () => ({
    type: VALIDATE_PAYMENT_TOKEN_BEGIN
})

export const validatePaymentTokenSuccess = (validateOtp) => ({
    type: VALIDATE_PAYMENT_TOKEN_SUCCESS,
    validateOtp
})

export const validatePaymentTokenFailure = (error) => ({
    type: VALIDATE_PAYMENT_TOKEN_FAILURE,
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