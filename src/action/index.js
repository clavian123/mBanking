//LOADING
export const SET_LOADING = 'SET_LOADING';

//NEWLOGIN
export const SYNC_STORAGE = 'SYNC_STORAGE';
export const STORAGE_EMPTY = 'STORAGE_EMPTY';
export const EASY_PIN_LOGIN = 'EASY_PIN_LOGIN';
export const EASY_PIN_LOGOUT = "EASY_PIN_LOGOUT";

//REGISTER
//INPUT PAN
export const CHECK_PAN_BEGIN = 'CHECK_PAN_BEGIN';
export const CHECK_PAN_FAILURE = 'CHECK_PAN_FAILURE';
export const CHECK_PAN_SUCCESS = 'CHECK_PAN_SUCCESS';
export const GET_REGISTER_TOKEN_BEGIN = 'GET_REGISTER_TOKEN_BEGIN';
export const GET_REGISTER_TOKEN_SUCCESS = 'GET_REGISTER_TOKEN_SUCCESS';
export const GET_REGISTER_TOKEN_FAILURE = 'GET_REGISTER_TOKEN_FAILURE';
export const VALIDATE_REGISTER_TOKEN_BEGIN = 'VALIDATE_REGISTER_TOKEN_BEGIN';
export const VALIDATE_REGISTER_TOKEN_SUCCESS = 'VALIDATE_REGISTER_TOKEN_SUCCESS';
export const VALIDATE_REGISTER_TOKEN_FAILURE = 'VALIDATE_REGISTER_TOKEN_FAILURE';
export const VALIDATE_PIN_BEGIN = 'VALIDATE_PIN_BEGIN';
export const VALIDATE_PIN_SUCCESS = 'VALIDATE_PIN_SUCCESS';
export const VALIDATE_PIN_FAILURE = 'VALIDATE_PIN_FAILURE';
export const CHECK_CUSTOMER_BEGIN = "CHECK_CUSTOMER_BEGIN";
export const CHECK_CUSTOMER_SUCCESS = "CHECK_CUSTOMER_SUCCESS";
export const CHECK_CUSTOMER_FAILURE = "CHECK_CUSTOMER_FAILURE";
export const CHECK_USERNAME_BEGIN = "CHECK_USERNAME_BEGIN";
export const CHECK_USERNAME_SUCCESS = "CHECK_USERNAME_SUCCESS";
export const CHECK_USERNAME_FAILURE = "CHECK_USERNAME_FAILURE";
export const CREATE_NEW_USER_BEGIN = "CREATE_NEW_USER_BEGIN";
export const CREATE_NEW_USER_SUCCESS = "CREATE_NEW_USER_SUCCESS";
export const CREATE_NEW_USER_FAILURE = "CREATE_NEW_USER_FAILURE";
export const GET_USER_BEGIN = "GET_USER_BEGIN";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const RESET_USER_PASSWORD_BEGIN = "RESET_USER_PASSWORD_BEGIN";
export const RESET_USER_PASSWORD_SUCCESS = "RESET_USER_PASSWORD_SUCCESS";
export const RESET_USER_PASSWORD_FAILURE = "RESET_USER_PASSWORD_FAILURE";
export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const GET_LOGIN_OTP_BEGIN = 'GET_LOGIN_OTP_BEGIN';
export const GET_LOGIN_OTP_SUCCESS = 'GET_LOGIN_OTP_SUCCESS';
export const GET_LOGIN_OTP_FAILURE = 'GET_LOGIN_OTP_FAILURE';
export const VALIDATE_LOGIN_TOKEN_BEGIN = 'VALIDATE_LOGIN_TOKEN_BEGIN';
export const VALIDATE_LOGIN_TOKEN_SUCCESS = 'VALIDATE_LOGIN_TOKEN_SUCCESS';
export const VALIDATE_LOGIN_TOKEN_FAILURE = 'VALIDATE_LOGIN_TOKEN_FAILURE';
export const SKIP_EASYPIN_LOGIN = 'SKIP_EASYPIN_LOGIN';

//LOGIN;
export const SYNC_STORAGE_BEGIN = 'SYNC_STORAGE_BEGIN';
export const SYNC_STORAGE_SUCCESS = 'SYNC_STORAGE_SUCCESS'
// export const STORAGE_EMPTY = 'STORAGE_EMPTY';
export const POST_CLIENT_LOGIN_BEGIN = 'POST_CLIENT_LOGIN_BEGIN';
export const POST_VALIDATE_CLIENT_LOGIN = 'POST_VALIDATE_CLIENT_LOGIN';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const POST_CLIENT_LOGIN_FAILURE = 'POST_CLIENT_LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

//EASYPINLOGIN
export const VALIDATE_EASYPIN_LOGIN = 'VALIDATE_EASYPIN_LOGIN';

//HOME
//BALANCE INQUIRY
export const GET_BALANCE_BEGIN = 'GET_BALANCE_BEGIN';
export const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';
export const GET_BALANCE_FAILURE = 'GET_BALANCE_FAILURE';
//ACCOUNT STATEMENT
export const GET_ACCOUNT_STATEMENT_BEGIN = 'GET_ACCOUNT_STATEMENT_BEGIN';
export const GET_ACCOUNT_STATEMENT_SUCCESS = 'GET_ACCOUNT_STATEMENT_SUCCESS';
export const GET_ACCOUNT_STATEMENT_FAILURE = 'GET_ACCOUNT_STATEMENT_FAILURE';
//GET CUSTOMER DATA
export const GET_CUSTOMER_DATA_BEGIN = 'GET_CUSTOMER_DATA_BEGIN';
export const GET_CUSTOMER_DATA_SUCCESS = 'GET_CUSTOMER_DATA_SUCCESS';
export const GET_CUSTOMER_DATA_FAILURE = 'GET_CUSTOMER_DATA_FAILURE';
//GET TRANSACTION RECOMMENDATION
export const GET_TRANSACTION_RECOMMENDATION_BEGIN = 'GET_TRANSACTION_RECOMMENDATION_BEGIN';
export const GET_TRANSACTION_RECOMMENDATION_SUCCESS = 'GET_TRANSACTION_RECOMMENDATION_SUCCESS';
export const GET_TRANSACTION_RECOMMENDATION_FAILURE = 'GET_TRANSACTION_RECOMMENDATION_FAILURE';

//TRANSFER
export const GET_BANK_LIST_BEGIN = 'GET_BANK_LIST_BEGIN';
export const GET_BANK_LIST_SUCCESS = 'GET_BANK_LIST_SUCCESS';
export const GET_BANK_LIST_FAILURE = 'GET_BANK_LIST_FAILURE';
export const CHECK_ACCOUNT_NUMBER_BEGIN = 'CHECK_ACCOUNT_NUMBER_BEGIN';
export const CHECK_ACCOUNT_NUMBER_SUCCESS = 'CHECK_ACCOUNT_NUMBER_SUCCESS';
export const CHECK_ACCOUNT_NUMBER_FAILURE = 'CHECK_ACCOUNT_NUMBER_FAILURE';
export const EMPTY_TARGET_ACCOUNT = 'EMPTY_TARGET_ACCOUNT';
export const SET_SOURCE_ACCOUNT_SUCCESS = 'SET_SOURCE_ACCOUNT_SUCCESS';
export const SET_DESTINATION_ACCOUNT_SUCCESS = 'SET_DESTINATION_ACCOUNT_SUCCESS';
export const SET_TRANSFER_AMOUNT = 'SET_TRANSFER_AMOUNT';
export const SET_TRANSFER_NOTE = 'SET_TRANSFER_NOTE';
export const GET_METHOD_LIST_BEGIN = 'GET_METHOD_LIST_BEGIN';
export const GET_METHOD_LIST_SUCCESS = 'GET_METHOD_LIST_SUCCESS';
export const GET_METHOD_LIST_FAILURE = 'GET_METHOD_LIST_FAILURE';
export const SET_SEND_METHOD = 'SET_SEND_METHOD';
export const CLEAR_SEND_METHOD = 'CLEAR_SEND_METHOD';
export const GET_LIST_DEST_BEGIN = 'GET_LIST_DEST_BEGIN';
export const GET_LIST_DEST_SUCCESS = 'GET_LIST_DEST_SUCCESS';
export const GET_LIST_DEST_FAILURE = 'GET_LIST_DEST_FAILURE';
export const GET_TRANSFER_TOKEN_BEGIN = 'GET_TRANSFER_TOKEN_BEGIN';
export const GET_TRANSFER_TOKEN_SUCCESS = 'GET_TRANSFER_TOKEN_SUCCESS';
export const GET_TRANSFER_TOKEN_FAILURE = 'GET_TRANSFER_TOKEN_FAILURE';
export const VALIDATE_TRANSFER_TOKEN_BEGIN = 'VALIDATE_TRANSFER_TOKEN_BEGIN';
export const VALIDATE_TRANSFER_TOKEN_SUCCESS = 'VALIDATE_TRANSFER_TOKEN_SUCCESS';
export const VALIDATE_TRANSFER_TOKEN_FAILURE = 'VALIDATE_TRANSFER_TOKEN_FAILURE';
export const SAVE_NEW_TARGET_ACCOUNT_BEGIN = 'SAVE_NEW_TARGET_ACCOUNT_BEGIN';
export const SAVE_NEW_TARGET_ACCOUNT_SUCCESS = 'SAVE_NEW_TARGET_ACCOUNT_SUCCESS';
export const SAVE_NEW_TARGET_ACCOUNT_FAILURE = 'SAVE_NEW_TARGET_ACCOUNT_FAILURE';
export const DELETE_TARGET_ACCOUNT_BEGIN = 'DELETE_TARGET_ACCOUNT_BEGIN';
export const DELETE_TARGET_ACCOUNT_SUCCESS = 'DELETE_TARGET_ACCOUNT_SUCCESS';
export const DELETE_TARGET_ACCOUNT_FAILURE = 'DELETE_TARGET_ACCOUNT_FAILURE';
export const TRANSFER_BEGIN = 'TRANSFER_BEGIN';
export const TRANSFER_SUCCESS = 'TRANSFER_SUCCESS';
export const TRANSFER_FAILURE = 'TRANSFER_FAILURE';

//PAYMENT
export const GET_TARGET_SUBSCRIBER_LIST_BEGIN = 'GET_TARGET_SUBSCRIBER_LIST_BEGIN';
export const GET_TARGET_SUBSCRIBER_LIST_SUCCESS = 'GET_TARGET_SUBSCRIBER_LIST_SUCCESS';
export const GET_TARGET_SUBSCRIBER_LIST_FAILURE = 'GET_TARGET_SUBSCRIBER_LIST_FAILURE';
export const DELETE_TARGET_SUBSCRIBER_BEGIN = 'DELETE_TARGET_SUBSCRIBER_BEGIN';
export const DELETE_TARGET_SUBSCRIBER_SUCCESS = 'DELETE_TARGET_SUBSCRIBER_SUCCESS';
export const DELETE_TARGET_SUBSCRIBER_FAILURE = 'DELETE_TARGET_SUBSCRIBER_FAILURE';
export const CHECK_PAYMENT_ACCOUNT_NUMBER_BEGIN = 'CHECK_PAYMENT_ACCOUNT_NUMBER_BEGIN';
export const CHECK_PAYMENT_ACCOUNT_NUMBER_SUCCESS = 'CHECK_PAYMENT_ACCOUNT_NUMBER_SUCCESS';
export const CHECK_PAYMENT_ACCOUNT_NUMBER_FAILURE = 'CHECK_PAYMENT_ACCOUNT_NUMBER_FAILURE';
export const SET_PAYMENT_SOURCE_ACCOUNT = 'SET_PAYMENT_SOURCE_ACCOUNT';
export const SET_PAYMENT_AMOUNT = 'SET_PAYMENT_AMOUNT';
export const GET_PAYMENT_TRANS_CHARGE_BEGIN = 'GET_PAYMENT_TRANS_CHARGE_BEGIN';
export const GET_PAYMENT_TRANS_CHARGE_SUCCESS = 'GET_PAYMENT_TRANS_CHARGE_SUCCESS';
export const GET_PAYMENT_TRANS_CHARGE_FAILURE = 'GET_PAYMENT_TRANS_CHARGE_FAILURE';
export const GET_PAYMENT_TOKEN_BEGIN = 'GET_PAYMENT_TOKEN_BEGIN';
export const GET_PAYMENT_TOKEN_SUCCESS = 'GET_PAYMENT_TOKEN_SUCCESS';
export const GET_PAYMENT_TOKEN_FAILURE = 'GET_PAYMENT_TOKEN_FAILURE';
export const VALIDATE_PAYMENT_TOKEN_BEGIN = 'VALIDATE_PAYMENT_TOKEN_BEGIN';
export const VALIDATE_PAYMENT_TOKEN_SUCCESS = 'VALIDATE_PAYMENT_TOKEN_SUCCESS';
export const VALIDATE_PAYMENT_TOKEN_FAILURE = 'VALIDATE_PAYMENT_TOKEN_FAILURE';
export const SAVE_NEW_TARGET_SUBSCRIBER_BEGIN = 'SAVE_NEW_TARGET_SUBSCRIBER_BEGIN';
export const SAVE_NEW_TARGET_SUBSCRIBER_SUCCESS = 'SAVE_NEW_TARGET_SUBSCRIBER_SUCCESS';
export const SAVE_NEW_TARGET_SUBSCRIBER_FAILURE = 'SAVE_NEW_TARGET_SUBSCRIBER_FAILURE';
export const PAYMENT_BEGIN = 'PAYMENT_BEGIN';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';