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

export function getBankList() {
    let address = "http://localhost:8080/targetBank";
    return dispatch => {
        dispatch(getBankListBegin());
        return axios.post(address).then(
            (res) => {
                dispatch(getBankListSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getBankListFailure(error));
            }
        )
    }
}

export function checkAccountNumber(bankCode, bankName, accNumber) {
    let req = {
        accNumber: accNumber
    }
    let address = "http://localhost:8080/findAccountDummyByAccountNumber";
    return dispatch => {
        dispatch(checkAccountNumberBegin());
        return axios.post(address, req).then(
            (res) => {
                if(res.data != null) {
                    dispatch(checkAccountNumberSuccess(bankCode, bankName, res.data.accountNumber, res.data.account_name));
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

// export function transfer(sourceAccNumber, destAccNumber, amount, fee, note, bankCode, ){
//     let address = "http://localhost:8080/saveNewFundTransfer"
//     return dispatch => {
//         dispatch(transferBegin());
//         return axios.post(address)
//     }
// }
