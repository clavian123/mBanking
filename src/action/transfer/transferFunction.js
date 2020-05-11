import axios from 'axios';

import {
    checkClientDestinationBegin,
    checkClientDestinationSuccess,
    checkClientDestinationEmpty,
    checkClientDestinationFailure,
    saveClientDestinationBegin,
    saveClientDestinationSuccess,
    saveClientDestinationFailure,
    getListClientDestinationBegin,
    getListClientDestinationSuccess,
    getListClientDestinationFailure,
    getClientTokenBegin,
    getClientTokenSuccess,
    getClientTokenFailure,
    transferProcessBegin,
    transferProcessSuccess,
    transferProcessFailure
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

const otpNotification = () => {
    
}

export function checkClientDestination(accNumber, navigate) {
    let req = {
        accNumber: accNumber
    };
    let address = "http://localhost:8080/validateDestinationAccount";
    return dispatch => {
        dispatch(checkClientDestinationBegin());
        return axios.post(address, req).then(
            (res) => {
                if (res.data.accNumber) {
                    dispatch(checkClientDestinationSuccess(res.data.accNumber, res.data.fullName));
                    navigate('ConfirmRegisterDestination');
                } else {
                    dispatch(checkClientDestinationEmpty());
                    alert("Account number is not found!")
                }
            }, (error) => {
                console.log(error);
                dispatch(checkClientDestinationFailure(error));
            }
        );
    }
};

export function saveClientDestination(accNumberMain, accNumberDest) {
    let req = {
        accNumberMain: accNumberMain,
        accNumberDest: accNumberDest
    };
    let address = "http://localhost:8080/saveNewRelation";
    return dispatch => {
        dispatch(saveClientDestinationBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(saveClientDestinationSuccess());
            }, (error) => {
                console.log(error);
                dispatch(saveClientDestinationFailure(error));
            }
        );
    }
};

export function getListClientDestination(accNumber) {
    let req = {
        accNumber: accNumber
    };
    let address = "http://localhost:8080/getAllRelationsByAccNumber";
    return dispatch => {
        dispatch(getListClientDestinationBegin());
        return axios.post(address, req).then(
            (res) => {
                console.log(res.data);
                dispatch(getListClientDestinationSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getListClientDestinationFailure(error));
            }
        );
    }
};

export function getClientToken(accNumber) {
    let req = {
        accNumber: accNumber
    };
    const state = store.getState();
    let address = "http://localhost:8080/otp";
    return dispatch => {
        dispatch(getClientTokenBegin());
        return axios.post(address, req).then(
            (res) => {
                console.log(res.data);
                dispatch(getClientTokenSuccess(res.data.token));
                console.log(store.getState().transfer);
                PushNotification.localNotification({
                    title: "MBanking",
                    message: "Your OTP Token is " + res.data.token
                });
            }, (error) => {
                console.log(error);
                dispatch(getClientTokenFailure(error));
            }
        );
    }
    
};

export function validateToken(accNumber, token) {
    let req = {
        accNumber: accNumber,
        token: token
    }
    let address = "http://localhost:8080/checkOtp"
    return axios.post(address, req).then(
        (res) => {
            console.log(res.data);
            return res.data
        }, (error) => {
            console.log(error);
        }
    )
}

export function handleTransfer(transfer) {
    let address = "http://localhost:8080/saveNewTransaction";
    return dispatch => {
        dispatch(transferProcessBegin());
        return axios.post(address, transfer).then(
            (res) => {
                console.log(res.data);
                dispatch(transferProcessSuccess());
            }, (error) => {
                console.log(error);
                dispatch(transferProcessFailure(error));
            }
        );
    }
};