import axios from 'axios';

import{
    checkPanBegin,
    checkPanFailure,
    checkPanSuccess
}from './registerAction'

export function checkPan(pan){
    let req = ({
        pan: pan
    });
    let address = "http://localhost:8080/getCustomerDummyByPAN";
    return dispatch => {
        dispatch(checkPanBegin());
        return axios.post(address, req).then(
            (res) => {
                console.log(res);
                dispatch(checkPanSuccess(res.data));
            }, (error) => {
                console.log(error);
                dispatch(checkPanFailure(error));
            }
        );
    }
}