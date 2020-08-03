import axios from 'axios';

import {
    getBalanceBegin,
    getBalanceSuccess,
    getBalanceFailure,
    getAccountStatementBegin,
    getAccountStatementSuccess,
    getAccountStatementFailure
} from './homeAction';

export function getBalance(cif_code) {
    let req = {
        cif_code: cif_code
    };
    let address = "http://192.168.100.174:8080/linkUnlinkAccount";
    return dispatch => {
        dispatch(getBalanceBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getBalanceSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getBalanceFailure(error));
            }
        )
    }
};

export function getStatements(cif_code) {
    let req = {
        cif_code: cif_code,
    };
    let address = "http://192.168.100.174:8080/getAllAccountStatementByCustomer";
    return dispatch => {
        dispatch(getAccountStatementBegin());
        return axios.post(address, req).then(
            (res) => {
                // console.log(res.data)
                dispatch(getAccountStatementSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getAccountStatementFailure(error));
            }
        )
    }
};