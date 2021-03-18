import axios from 'axios';

import {
    getAccountAndBalanceBegin,
    getAccountAndBalanceSuccess,
    getAccountAndBalanceFailure,
    getAccountStatementBegin,
    getAccountStatementSuccess,
    getAccountStatementFailure,
    getCustomerDataBegin,
    getCustomerDataSuccess,
    getCustomerDataFailure,
    getTransactionRecommendationBegin,
    getTransactionRecommendationSuccess,
    getTransactionRecommendationFailure
} from './homeAction';

export function getBalance(cif_code) {
    let req = {
        cif_code: cif_code
    };
    let address = "http://localhost:8080/linkUnlinkAccount";
    return dispatch => {
        dispatch(getAccountAndBalanceBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getAccountAndBalanceSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getAccountAndBalanceFailure(error));
            }
        )
    }
};

export function getStatements(cif_code) {
    let req = {
        cif_code: cif_code,
    };
    let address = "http://localhost:8080/getAllAccountStatementByCustomer";
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

export function getCustomerData(cif_code) {
    let req = {
        cif_code: cif_code
    };
    let address = "http://localhost:8080/getCustomerDummyByCifCode";

    return dispatch => {
        dispatch(getCustomerDataBegin());
        return axios.post(address, req).then(
            (res) => {
                // console.log(res.data);
                dispatch(getCustomerDataSuccess(res.data.gender, res.data.email))
            }, (error) => {
                console.log(error);
                dispatch(getCustomerDataFailure(error));
            }
        )
    }
}

export function getTransactionRecommendation(cif_code){
    let req = {
        cif_code: cif_code
    }
    let address = "http://localhost:8080/getTransactionRecommendation";

    return dispatch => {
        dispatch(getTransactionRecommendationBegin());
        return axios.post(address, req).then(
            (res) => {
                dispatch(getTransactionRecommendationSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(getTransactionRecommendationFailure(error));
            }
        )
    }
}