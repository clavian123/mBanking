import axios from 'axios';

import {
    getBankListBegin,
    getBankListSuccess,
    getBankListFailure,
    checkAccountNumberBegin,
    checkAccountNumberSuccess,
    checkAccountNumberFailure,
    setSourceAccountSuccess,
    getMethodListBegin,
    getMethodListSuccess,
    getMethodListFailure,
    transferBegin,
    transferSuccess,
    transferFailure,
    getListDestBegin,
    getListDestSuccess,
    getListdestFailure,
    getTransferTokenBegin,
    getTransferTokenSuccess,
    getTransferTokenFailure,
    validateTransferTokenBegin,
    validateTransferTokenSuccess,
    validateTransferTokenFailure,
    saveNewTargetAccountBegin,
    saveNewTargetAccountSuccess,
    saveNewTargetAccountFailure,    
} from './transferAction';

import PushNotification from 'react-native-push-notification'

PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios'
});

export function getBankList(keyword) {
    let req = {
        keyword: keyword
    }
    let address = "http://localhost:8080/targetBank";
    return dispatch => {
        dispatch(getBankListBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getBankListSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getBankListFailure(error));
            }
        )
    }
}

export function checkAccountNumber(bankCode, bankId, bankName, accNumber) {
    let req = {
        accNumber: accNumber
    }
    let address = "http://localhost:8080/findAccountDummyByAccountNumber";
    return dispatch => {
        dispatch(checkAccountNumberBegin());
        return axios.post(address, req).then(
            (res) => {
                if(res.data != null) {
                    dispatch(checkAccountNumberSuccess(bankCode, bankId, bankName, res.data.accountNumber, res.data.account_name));
                }else{
                    dispatch(checkAccountNumberFailure('Fail'));
                }
            }, (error) => {
                console.log(error);
                dispatch(checkAccountNumberFailure(error));
            }
        )
    }
}

export function setSourceAccount(accNumber, fullName, balance) {
    return dispatch => {
        dispatch(setSourceAccountSuccess(accNumber, fullName, balance));
    }
};

export function getMethodList() {
    let address = "http://localhost:8080/transCharge";
    return dispatch => {
        dispatch(getMethodListBegin());
        return axios.post(address).then(
            (res) => {
                dispatch(getMethodListSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getMethodListFailure(error));
            }
        )
    }
}

export function getListDest(cif_code){
    let req = {
        cif_code: cif_code
    }
    let address = "http://localhost:8080/getTargetAccounts"

    return dispatch => {
        dispatch(getListDestBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getListDestSuccess(res.data))
            }, (error) => {
                console.log(error);
                dispatch(getListdestFailure(error))
            }
        )
    }
}

export function transfer(sourceAccNumber, destAccNumber, amount, fee, note, bankId){
    let req = {
        accountNumber: sourceAccNumber,
        targetAccountNumber: destAccNumber,
        amount: amount,
        bankCharge: fee,
        message: note,
        targetBankId: bankId,
        status: 4,
        lookup: 1,
    }
    let address = "http://localhost:8080/saveNewFundTransfer"

    return dispatch => {
        dispatch(transferBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(transferSuccess(res.data))
            }, (error) => {
                console.log(error);
                dispatch(transferFailure(error))
            }
        )
    }
}

export function getTransferToken(cif_code, totalAmount, destAccNumber, destAccName, targetBankName){
    let req = {
        cif_code: cif_code,
        totalAmount: totalAmount,
        accNumber: destAccNumber,
        accName: destAccName,
        bankName: targetBankName,
        currency: "IDR"
    }
    let address = "http://localhost:8080/saveTransferOtp"

    return dispatch => {
        dispatch(getTransferTokenBegin());
        return axios.post(address, req).then(
            (res) => {
                console.log(res.data.customer);
                dispatch(getTransferTokenSuccess(res.data.customer.email))
            }, (error) => {
                console.log(error)
                dispatch(getTransferTokenFailure(error))
            }
        )
    }
}

export function validateTransferToken(cif_code, token){
    let req = {
        cif_code: cif_code,
        token: token
    }
    let address = "http://localhost:8080/validateTransferOtp"

    return dispatch => {
        dispatch(validateTransferTokenBegin())
        return axios.post(address, req).then(
            (res) => {
                dispatch(validateTransferTokenSuccess(res.data))
            }, (error) => {
                console.log(error);
                dispatch(validateTransferTokenFailure(error))
            }
        )
    }
}

export function saveNewTargetAccount(cif_code, accountNumber, bankId){
    let req = {
        cif_code: cif_code,
        accountNumber: accountNumber,
        bankId: bankId,
        status: 4
    }
    let address = "http://localhost:8080/saveNewTargetAccount"

    return dispatch => {
        dispatch(saveNewTargetAccountBegin())
        return axios.post(address, req).then(
            (res) => {
                if(res.data){
                    dispatch(saveNewTargetAccountSuccess(true))
                }else{
                    dispatch(saveNewTargetAccountSuccess(false))
                }
            }, (error) =>{
                console.log(error);
                dispatch(saveNewTargetAccountFailure(error))
            }
        )
    }
}
