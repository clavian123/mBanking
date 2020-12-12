import {
  GET_BANKING_SUMMARY_BEGIN,
  GET_BANKING_SUMMARY_SUCCESS,
  GET_BANKING_SUMMARY_FAILED
} from '../index';

export const getBankingSummaryBegin = () => ({
  type: GET_BANKING_SUMMARY_BEGIN
});

export const getBankingSummarySuccess = (
  transactionOut,
  weeklyHighestY,
  weeklyDebitCreditTotal,
  monthlyHighestY,
  monthlyDebitCreditTotal
) => ({
  type: GET_BANKING_SUMMARY_SUCCESS,
  transactionOut,
  weeklyHighestY,
  weeklyDebitCreditTotal,
  monthlyHighestY,
  monthlyDebitCreditTotal
});

export const getBankingSummaryFailed = (error) => ({
  type: GET_BANKING_SUMMARY_FAILED,
  error
});