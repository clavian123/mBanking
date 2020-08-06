import axios from 'axios';

import {
    // checkClientDestinationBegin,
    // checkClientDestinationSuccess,
    // checkClientDestinationEmpty,
    // checkClientDestinationFailure,
    // saveClientDestinationBegin,
    // saveClientDestinationSuccess,
    // saveClientDestinationFailure,
    // getListClientDestinationBegin,
    // getListClientDestinationSuccess,
    // getListClientDestinationFailure,
    // getClientTokenBegin,
    // getClientTokenSuccess,
    // getClientTokenFailure,
    // transferProcessBegin,
    // transferProcessSuccess,
    // transferProcessFailure,
    getBankListBegin,
    getBankListSuccess,
    getBankListFailure,
    checkAccountNumberBegin,
    checkAccountNumberSuccess,
    checkAccountNumberFailure,
    setSourceAccountSuccess,
} from './transferAction';

import store from '../../store/index';
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

export function checkAccountNumber(bankName, accNumber) {
    let req = {
        accNumber: accNumber
    }
    let address = "http://localhost:8080/findAccountDummyByAccountNumber";
    return dispatch => {
        dispatch(checkAccountNumberBegin());
        return axios.post(address, req).then(
            (res) => {
                if(res.data != null) {
                    dispatch(checkAccountNumberSuccess(bankName, res.data.accountNumber, res.data.account_name));
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

// export function checkClientDestination(accNumber) {
//     let req = accNumber;
//     let address = "http://192.168.100.174:8080/findAccountDummyByAccountNumber";
//     return dispatch => {
//         dispatch(checkClientDestinationBegin());
//         return axios.post(address, req).then(
//             (res) => {
//                 dispatch(checkClientDestinationSuccess(res.data.account_number));
//             }, (error) => {
//                 console.log(error);
//                 dispatch(checkClientDestinationFailure(error));
//             }
//         );
//     }
// };

// export function saveClientDestination(accNumberMain, accNumberDest) {
//     let req = {
//         accNumberMain: accNumberMain,
//         accNumberDest: accNumberDest
//     };
//     let address = "http://192.168.0.104:8080/saveNewRelation";
//     return dispatch => {
//         dispatch(saveClientDestinationBegin());
//         return axios.post(address, req).then(
//             (res) => {
//                 dispatch(saveClientDestinationSuccess());
//             }, (error) => {
//                 console.log(error);
//                 dispatch(saveClientDestinationFailure(error));
//             }
//         );
//     }
// };

// export function getListClientDestination(accNumber) {
//     let req = {
//         accNumber: accNumber
//     };
//     let address = "http://192.168.0.104:8080/getAllRelationsByAccNumber";
//     return dispatch => {
//         dispatch(getListClientDestinationBegin());
//         return axios.post(address, req).then(
//             (res) => {
//                 console.log(res.data);
//                 dispatch(getListClientDestinationSuccess(res.data));
//             }, (error) => {
//                 console.log(error);
//                 dispatch(getListClientDestinationFailure(error));
//             }
//         );
//     }
// };

// export function getClientToken(accNumber) {
//     let req = {
//         accNumber: accNumber
//     };
//     const state = store.getState();
//     let address = "http://192.168.0.104:8080/otp";
//     return dispatch => {
//         dispatch(getClientTokenBegin());
//         return axios.post(address, req).then(
//             (res) => {
//                 console.log(res.data);
//                 dispatch(getClientTokenSuccess(res.data.token));
//                 console.log(store.getState().transfer);
//                 PushNotification.localNotification({
//                     title: "MBanking",
//                     message: "Your OTP Token is " + res.data.token
//                 });
//             }, (error) => {
//                 console.log(error);
//                 dispatch(getClientTokenFailure(error));
//             }
//         );
//     }
    
// };

// export function validateToken(accNumber, token) {
//     let req = {
//         accNumber: accNumber,
//         token: token
//     }
//     let address = "http://192.168.0.104:8080/checkOtp"
//     return axios.post(address, req).then(
//         (res) => {
//             console.log(res.data);
//             return res.data
//         }, (error) => {
//             console.log(error);
//         }
//     )
// }

// export function handleTransfer(transfer) {
//     let address = "http://192.168.0.100:8080/saveNewTransaction";
//     return dispatch => {
//         dispatch(transferProcessBegin());
//         return axios.post(address, transfer).then(
//             (res) => {
//                 console.log(res.data);
//                 dispatch(transferProcessSuccess());
//             }, (error) => {
//                 console.log(error);
//                 dispatch(transferProcessFailure(error));
//             }
//         );
//     }
// };