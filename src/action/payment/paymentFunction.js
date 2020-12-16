import axios from 'axios';

import {
    getTargetSubscriberListBegin,
    getTargetSubscriberListSuccess,
    getTargetSubscriberListFailure,
    deleteTargetSubscriberBegin,
    deleteTargetSubscriberSuccess,
    deleteTargetSubscriberFailure,
    checkPaymentAccountNumberBegin,
    checkPaymentAccountNumberSuccess,
    checkPaymentAccountNumberFailure,
    getPaymentTransChargeBegin,
    getPaymentTransChargeSuccess,
    getPaymentTransChargeFailure,
    saveNewTargetSubscriberBegin,
    saveNewTargetSubscriberSuccess,
    saveNewTargetSubscriberFailure,
    getPaymentTokenBegin,
    getPaymentTokenSuccess,
    getPaymentTokenFailure,
    validatePaymentTokenBegin,
    validatePaymentTokenSuccess,
    validatePaymentTokenFailure,
    billPaymentBegin,
    billPaymentSuccess,
    billPaymentFailure,
} from './paymentAction'

import { ToastAndroid } from 'react-native';

export function getTargetSubscriberList(keyword, merchantCode, cif_code) {
    let req;
    let address;
    if(merchantCode == ""){
        req = {
            keyword: keyword,
            cif_code: cif_code
        }
        address = "http://192.168.0.100:8080/getTargetSubscriber";
    }else{
        req = {
            keyword: keyword,
            merchantCode: merchantCode,
            cif_code: cif_code
        }
        address = "http://192.168.0.100:8080/getTargetSubscriberByMerchant"
    }

    return dispatch => {
        dispatch(getTargetSubscriberListBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getTargetSubscriberListSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getTargetSubscriberListFailure(error));
            }
        )
    }
}

export function deleteTargetSubscriber(targetSubscriber) {
    let req = {
        targetSubscriber: targetSubscriber
    }
    let address = "http://192.168.0.100:8080/deleteTargetSubscriber";
    
    return dispatch => {
        dispatch(deleteTargetSubscriberBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(deleteTargetSubscriberSuccess());
            }, (error) => {
                console.log(error);
                dispatch(deleteTargetSubscriberFailure(error));
            }
        )
    }
}

export function checkPaymentAccountNumber(merchantCode, accNumber) {
    let req = {
        merchantCode: merchantCode,
        accNumber: accNumber
    }
    let address = "http://192.168.0.100:8080/findBillpaymentAccountDummyByAccountNumberAndMerchant";
    
    return dispatch => {
        dispatch(checkPaymentAccountNumberBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(checkPaymentAccountNumberSuccess(res.data.merchant.code, res.data.merchant.name, res.data.accountNumber, res.data.name, res.data.billed_amount));
                return res.data;
            }, (error) => {
                console.log(error);
                ToastAndroid.show("Account Number not Found", ToastAndroid.SHORT);
                dispatch(checkPaymentAccountNumberFailure(error));
            }
        )
    }
}

export function getPaymentTransCharge(merchantCode, merchantName, accNumber, accName) {
    let req = {
        merchantCode: merchantCode,
    }
    let address = "http://192.168.0.100:8080/getBillPaymentTransCharge";

    return dispatch => {
        dispatch(getPaymentTransChargeBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getPaymentTransChargeSuccess(merchantCode, merchantName, accNumber, accName, res.data.charge_amount));
                return res.data.charge_amount;
            }, (error) => {
                console.log(error);
                ToastAndroid.show("Failed to check Transaction Charge", ToastAndroid.SHORT);
                dispatch(getPaymentTransChargeFailure(error));
            }
        )
    }
}

export function saveNewTargetSubscriber(merchantCode, subscriberNumber, cif_code) {
    let req = {
        merchantCode: merchantCode,
        subscriberNumber: subscriberNumber,
        cif_code: cif_code
    }
    let address = 'http://192.168.0.100:8080/saveNewTargetSubscriber';

    return dispatch => {
        dispatch(saveNewTargetSubscriberBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(saveNewTargetSubscriberSuccess());
                return res
            }, (error) => {
                console.log(error);
                dispatch(saveNewTargetSubscriberFailure(error));
            }
        )
    }
}

export function getPaymentToken(cif_code, code, totalAmount, currency, subscriberNumber, merchant){
    let req = {
        cif_code: cif_code,
        code: code,
        totalAmount: totalAmount,
        currency: currency,
        subscriberNumber: subscriberNumber,
        merchant: merchant
    }
    let address = 'http://192.168.0.100:8080/saveTempOtp';

    return dispatch => {
        dispatch(getPaymentTokenBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getPaymentTokenSuccess());
            }, (error) => {
                console.log(error);
                dispatch(getPaymentTokenFailure(error));
            }
        )
    }
}

export function validatePaymentToken(code, cif_code, token) {
    let req = {
        code: code,
        cif_code: cif_code,
        token: token
    }
    let address = 'http://192.168.0.100:8080/validateTempOtp';

    return dispatch => {
        dispatch(validatePaymentTokenBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(validatePaymentTokenSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(validatePaymentTokenFailure(error));
            }
        )
    }
}

export function billPayment(customerNumber, customerName, accNumber, amount, bankCharge, merchantCode) {
    let req = {
        customerNumber: customerNumber,
        customerName: customerName,
        accNumber: accNumber,
        amount: amount,
        bankCharge: bankCharge,
        merchantCode: merchantCode,
    }

    let address = "http://192.168.0.100:8080/saveNewBillpaymentTransaction";

    return dispatch => {
        dispatch(billPaymentBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(billPaymentSuccess(res.data));
                return res.data;
            }, (error) => {
                console.log(error);
                dispatch(billPaymentFailure(error));
            }
        )
    }
}