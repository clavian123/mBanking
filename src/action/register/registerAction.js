import{
    CHECK_PAN_BEGIN,
    CHECK_PAN_FAILURE,
    CHECK_PAN_SUCCESS,
    GET_REGISTER_TOKEN_BEGIN,
    GET_REGISTER_TOKEN_SUCCESS,
    GET_REGISTER_TOKEN_FAILURE,
    VALIDATE_REGISTER_TOKEN_BEGIN,
    VALIDATE_REGISTER_TOKEN_SUCCESS,
    VALIDATE_REGISTER_TOKEN_FAILURE,
    VALIDATE_PIN_BEGIN,
    VALIDATE_PIN_SUCCESS,
    VALIDATE_PIN_FAILURE,
    CHECK_CUSTOMER_BEGIN,
    CHECK_CUSTOMER_SUCCESS,
    CHECK_CUSTOMER_FAILURE,
    CHECK_USERNAME_BEGIN,
    CHECK_USERNAME_SUCCESS,
    CHECK_USERNAME_FAILURE,
    CREATE_NEW_USER_BEGIN,
    CREATE_NEW_USER_SUCCESS,
    CREATE_NEW_USER_FAILURE,
    GET_USER_BEGIN,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    RESET_USER_PASSWORD_BEGIN,
    RESET_USER_PASSWORD_SUCCESS,
    RESET_USER_PASSWORD_FAILURE
}from '../index';

export const checkPanBegin = () => ({
    type: CHECK_PAN_BEGIN,
});

export const checkPanSuccess = (customer, email, cifcode) => ({
    type: CHECK_PAN_SUCCESS,
    customer,
    email,
    cifcode
});

export const checkPanFailure = (error) => ({
    type: CHECK_PAN_FAILURE,
    error,
});

export const getRegisterTokenBegin = () => ({
    type: GET_REGISTER_TOKEN_BEGIN,
});

export const getRegisterTokenSuccess = () => ({
    type: GET_REGISTER_TOKEN_SUCCESS,
});

export const getRegisterTokenFailure = (error) => ({
    type: GET_REGISTER_TOKEN_FAILURE,
    error
});

export const validateRegisterTokenBegin = () => ({
    type: VALIDATE_REGISTER_TOKEN_BEGIN
});

export const validateRegisterTokenSuccess = (validateToken) => ({
    type: VALIDATE_REGISTER_TOKEN_SUCCESS,
    validateToken
});

export const validateRegisterTokenFailure = (error) => ({
    type: VALIDATE_REGISTER_TOKEN_FAILURE,
    error
});

export const validatePinBegin = () => ({
    type: VALIDATE_PIN_BEGIN
});

export const validatePinSuccess = (checkPin) => ({
    type: VALIDATE_PIN_SUCCESS,
    checkPin
});

export const validatePinFailure = (error) => ({
    type: VALIDATE_PIN_FAILURE,
    error
});

export const checkCustomerBegin = () => ({
    type: CHECK_CUSTOMER_BEGIN
});

export const checkCustomerSuccess = (customerApps) => ({
    type: CHECK_CUSTOMER_SUCCESS,
    customerApps
});

export const checkCustomerFailure = (error) => ({
    type: CHECK_CUSTOMER_FAILURE,
    error
});

export const checkUsernameBegin = () => ({
    type: CHECK_USERNAME_BEGIN
});

export const checkUsernameSuccess = (usernameExist) => ({
   type: CHECK_USERNAME_SUCCESS,
   usernameExist 
});

export const checkUsernameFailure = (error) => ({
    type: CHECK_USERNAME_FAILURE,
    error
});

export const createNewUserBegin = () => ({
    type: CREATE_NEW_USER_BEGIN
});

export const createNewUserSuccess = (customerApps) => ({
    type: CREATE_NEW_USER_SUCCESS,
    customerApps
});

export const createNewUserFailure = (error) => ({
    type: CREATE_NEW_USER_FAILURE,
    error
});

export const getUserBegin = () => ({
    type: GET_USER_BEGIN
});

export const getUserSuccess = (username) => ({
    type: GET_USER_SUCCESS,
    username
});

export const getUserFailure = (error) => ({
    type: GET_USER_FAILURE,
    error
});

export const resetUserPasswordBegin = () => ({
    type: RESET_USER_PASSWORD_BEGIN
});

export const resetUserPasswordSuccess = () => ({
    type: RESET_USER_PASSWORD_SUCCESS
});

export const resetUserPasswordFailure = (error) => ({
    type: RESET_USER_PASSWORD_FAILURE,
    error
});
