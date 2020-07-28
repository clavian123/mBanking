import axios from 'axios';

import{
    checkPanBegin,
    checkPanFailure,
    checkPanSuccess,
    getRegisterTokenBegin,
    getRegisterTokenSuccess,
    getRegisterTokenFailure,
    validateRegisterTokenBegin,
    validateRegisterTokenSuccess,
    validateRegisterTokenFailure,
    checkCustomerBegin,
    checkCustomerSuccess,
    checkCustomerFailure,
    validatePinBegin,
    validatePinSuccess,
    validatePinFailure,
    checkUsernameBegin,
    checkUsernameSuccess,
    checkUsernameFailure,
    createNewUserBegin,
    createNewUserSuccess,
    createNewUserFailure,
    getUserBegin,
    getUserSuccess,
    getUserFailure,
    resetUserPasswordBegin,
    resetUserPasswordSuccess,
    resetUserPasswordFailure
}from './registerAction'

export function checkPan(pan){
    let req = ({
        pan: pan
    });
    let address = "http://192.168.0.103:8080/getCustomerDummyByPAN";
    return dispatch => {
        dispatch(checkPanBegin());
        return axios.post(address, req).then(
            (res) => {
                if(res.data != null){
                    dispatch(checkPanSuccess(res.data.id, res.data.email, res.data.cifCode));
                }
            }, (error) => {
                console.log(error);
                dispatch(checkPanFailure(error));
            }
        );
    }
}

export function getRegisterToken(customer){
    let req = ({
        customer: customer
    });

    let address = "http://192.168.0.103:8080/saveRegisterOtp";
    return dispatch => {
        dispatch(getRegisterTokenBegin());
        return axios.post(address, req).then(
            (res) => {
                if(res.data != null){
                    dispatch(getRegisterTokenSuccess());
                }
            }, (error) => {
                console.log(error);
                dispatch(getRegisterTokenFailure(error));
            }
        )
    }
}

export function validateRegisterToken(customer, token){
    let req = ({
        customer: customer,
        token: token
    });

    let address = "http://192.168.0.103:8080/validateRegisterOtp";
    return dispatch => {
        dispatch(validateRegisterTokenBegin());
        return axios.post(address, req). then(
            (res) => {
                dispatch(validateRegisterTokenSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(validateRegisterTokenFailure(error));
            }
        )
    }
}

export function validatePin(customer, pin){
    let req = ({
        customer: customer,
        pin: pin
    });

    let address = "http://192.168.0.103:8080/validatePIN";
    return dispatch => {
        dispatch(validatePinBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(validatePinSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(validatePinFailure(error));
            }
        )
    }
}

export function checkCustomer(cifcode){
    let req = ({
        cif_code: cifcode
    });

    let address = "http://192.168.0.103:8080/getCustomerByCifCode";

    return dispatch => {
        dispatch(checkCustomerBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(checkCustomerSuccess(res.data.id));
            }, (error) => {
                console.log(error);
                dispatch(checkCustomerFailure(error));
            }
        )
    }
}

export function checkUsername(username){
    let req = {
        username: username
    }

    let address = "http://192.168.0.103:8080/checkUsername";

    return dispatch => {
        dispatch(checkUsernameBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(checkUsernameSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(checkUsernameFailure(error));
            }
        )
    }
}

export function createNewUser(username, password, customer, status){
    let req={
        username: username,
        password: password,
        customer: customer,
        status: status
    }

    let address = "http://192.168.0.103:8080/saveNewUser";

    return dispatch => {
        dispatch(createNewUserBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(createNewUserSuccess(res.data.customer.id));
            }, (error) => {
                console.log(error);
                dispatch(createNewUserFailure(error));
            }
        )
    }
}

export function getUser(customer){
    let req = {
        customer: customer
    }

    let address = "http://192.168.0.103:8080/getUserByCustomer";

    return dispatch => {
        dispatch(getUserBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getUserSuccess(res.data.username));
            }, (error) => {
                console.log(error);
                dispatch(getUserFailure(error));
            }
        )
    }
}

export function resetUserPassword(username, password){
    let req = {
        username: username,
        password: password
    }

    let address = "http://192.168.0.103:8080/resetUserPassword";

    return dispatch => {
        dispatch(resetUserPasswordBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(resetUserPasswordSuccess());
            }, (error) => {
                console.log(error);
                dispatch(resetUserPasswordFailure());
            }
        )
    }
}