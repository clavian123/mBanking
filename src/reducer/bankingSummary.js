import {
  GET_BANKING_SUMMARY_BEGIN,
  GET_BANKING_SUMMARY_SUCCESS,
  GET_BANKING_SUMMARY_FAILED
} from '../action/index';

const initialState = {
  transactionOut: [],
  weeklyHighestY: 0,
  weeklyDebitCreditTotal: {},
  monthlyHighestY: 0,
  monthlyDebitCreditTotal: {},
  loading: false,
  error: null
};

const bankingSummary = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANKING_SUMMARY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_BANKING_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        transactionOut: action.transactionOut,
        weeklyHighestY: action.weeklyHighestY,
        weeklyDebitCreditTotal: action.weeklyDebitCreditTotal,
        monthlyHighestY: action.monthlyHighestY,
        monthlyDebitCreditTotal: action.monthlyDebitCreditTotal
      };

    case GET_BANKING_SUMMARY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  };
};

export default bankingSummary;