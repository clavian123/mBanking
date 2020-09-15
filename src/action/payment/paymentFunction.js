import axios from 'axios';

import {
    checkPaymentAccountNumberBegin,
    checkPaymentAccountNumberSuccess,
    checkPaymentAccountNumberFailure,
    getPaymentTransChargeBegin,
    getPaymentTransChargeSuccess,
    getPaymentTransChargeFailure,
    billPaymentBegin,
    billPaymentSuccess,
    billPaymentFailure,
} from './paymentAction'

import PushNotification from 'react-native-push-notification'
import { ToastAndroid } from 'react-native';

export function checkPaymentAccountNumber(merchantCode, accNumber) {
    let req = {
        merchantCode: merchantCode,
        accNumber: accNumber
    }
    let address = "http://localhost:8080/findBillpaymentAccountDummyByAccountNumberAndMerchant";
    
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
    let address = "http://localhost:8080/getBillPaymentTransCharge";

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

export function billPayment(customerNumber, customerName, accNumber, amount, bankCharge, merchantCode) {
    let req = {
        customerNumber: customerNumber,
        customerName: customerName,
        accNumber: accNumber,
        amount: amount,
        bankCharge: bankCharge,
        merchantCode: merchantCode,
    }

    let address = "http://localhost:8080/saveNewBillpaymentTransaction";

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