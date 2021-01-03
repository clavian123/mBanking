import axios from 'axios';
import {
  getBankingSummaryBegin,
  getBankingSummarySuccess,
  getBankingSummaryFailed
} from './bankingSummaryAction';

export function getBankingSummary(deviceId) {
  let req = { deviceId };
  let address = "http://192.168.0.105:8080/banking-summary";

  return dispatch => {
    dispatch(getBankingSummaryBegin);
    return axios
      .post(address, req)
      .then(
        (res) => {
          const {
            transactionOut,
            weeklyHighestY,
            weeklyDebitCreditTotal,
            monthlyHighestY,
            monthlyDebitCreditTotal
          } = res.data;
          dispatch(getBankingSummarySuccess(
            transactionOut,
            weeklyHighestY,
            weeklyDebitCreditTotal,
            monthlyHighestY,
            monthlyDebitCreditTotal
          ));
        }, (error) => {
          dispatch(getBankingSummaryFailed(error));
        }
      );
  };
};