import axios from 'axios';

import {
    getBalanceBegin,
    getBalanceSuccess,
    getBalanceFailure,
    getAccountStatementBegin,
    getAccountStatementSuccess,
    getAccountStatementFailure
} from './homeAction';

export function getBalance(accNumber) {
    let req = {
        accNumber: accNumber
    };
    let address = "http://localhost:8080/getBalanceByAccNumber";
    return dispatch => {
        dispatch(getBalanceBegin());
        return axios.post(address, req).then(
            (res) => {
                console.log(res.data);
                dispatch(getBalanceSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getBalanceFailure(error));
            }
        )
    }
};

export function getStatements(accNumber, startDate, endDate) {
    let req = {
        accNumber: accNumber,
        startDate: startDate,
        endDate: endDate
    };
    let address = "http://localhost:8080/getAllHistoriesByAccNumberAndDates";
    return dispatch => {
        dispatch(getAccountStatementBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getAccountStatementSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getAccountStatementFailure(error));
            }
        )
    }
};