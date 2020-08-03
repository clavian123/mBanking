import{
    CHECK_PAN_BEGIN,
    CHECK_PAN_SUCCESS,
    CHECK_PAN_FAILURE,
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
    RESET_USER_PASSWORD_FAILURE,
    LOGIN_BEGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_LOGIN_OTP_BEGIN,
    GET_LOGIN_OTP_SUCCESS,
    GET_LOGIN_OTP_FAILURE,
    VALIDATE_LOGIN_TOKEN_BEGIN,
    VALIDATE_LOGIN_TOKEN_SUCCESS,
    VALIDATE_LOGIN_TOKEN_FAILURE,
    SKIP_EASYPIN_LOGIN
}from '../action/index';

initialState = {
    customerDummyId: "",
    email: "",
    cif_code: "",
    customerId: "",
    validateLogin: false,
    validateRegisterToken: false,
    validateLoginToken: false,
    username: "",
    name: "",
    checkPin: false,
    loading: false,
    usernameExist: false,
    error: null,
    skip: false
};

const register = (state = initialState, action) => {
    switch(action.type){
        case CHECK_PAN_BEGIN:
            return{
                ...state,
                loading: true,
                error: null
            }
        
        case CHECK_PAN_FAILURE:
            return{
                ...state,
                customerDummyId: "",
                email: "",
                cif_code: "",
                loading: false,
                error: action.error
            }
        
        case CHECK_PAN_SUCCESS:
            return{
                ...state,
                customerDummyId: action.customerDummyId,
                loading: false,
                email: action.email,
                cif_code: action.cif_code
            }
        
        case GET_REGISTER_TOKEN_BEGIN:
            return{
                ...state,
                loading: true,
                error: null
            }

        case GET_REGISTER_TOKEN_SUCCESS:
            return{
                ...state,
                loading: false
            }

        case GET_REGISTER_TOKEN_FAILURE:
            return{
                ...state,
                error: action.error,
                loading: false
            }

        case VALIDATE_REGISTER_TOKEN_BEGIN:
            return{
                ...state,
                loading: true,
                error: null
            }
        
        case VALIDATE_REGISTER_TOKEN_SUCCESS:
            return{
                ...state,
                loading: false,
                validateRegisterToken: action.validateRegisterToken
            }

        case VALIDATE_REGISTER_TOKEN_FAILURE:
            return{
                ...state,
                loading: false,
                validateRegisterToken: false,
                error: action.error
            }

        case VALIDATE_PIN_BEGIN:
            return{
                ...state,
                loading: true
            }

        case VALIDATE_PIN_SUCCESS:
            return{
                ...state,
                loading: false,
                checkPin: action.checkPin
            }

        case VALIDATE_PIN_FAILURE:
            return{
                ...state,
                error: action.error,
                loading: false
            }

        case CHECK_CUSTOMER_BEGIN:
            return{
                ...state,
                loading: true
            }

        case CHECK_CUSTOMER_SUCCESS:
            return{
                ...state,
                loading: false,
                customerId: action.customerId
            }

        case CHECK_CUSTOMER_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        
        case CHECK_USERNAME_BEGIN:
            return{
                ...state,
                loading: false
            }
        
        case CHECK_USERNAME_SUCCESS:
            return{
                ...state,
                usernameExist: action.usernameExist
            }

        case CHECK_USERNAME_FAILURE:
            return{
                ...state,
                error: action.error
            }

        case CREATE_NEW_USER_BEGIN:
            return{
                ...state,
                loading: true
            }

        case CREATE_NEW_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                customerId: action.customerId,
                name: action.name
            }

        case CREATE_NEW_USER_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error
            }

        case GET_USER_BEGIN:
            return{
                ...state,
                loading: true,
            }

        case GET_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                username: action.username
            }
        
        case GET_USER_FAILURE: 
            return{
                ...state,
                loading: false,
                error: action.error
            }
   
        case RESET_USER_PASSWORD_BEGIN:
            return{
                ...state,
                loading: true
            }

        case RESET_USER_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                name: action.name
            }

        case RESET_USER_PASSWORD_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error
            }

        case LOGIN_BEGIN:
            return{
                ...state,
                loading: true
            }

        case LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                customerId: action.customerId,
                cif_code: action.cif_code,
                name: action.name,
                email: action.email,
                validateLogin: action.validateLogin
            }
        
        case LOGIN_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error
            }

        case GET_LOGIN_OTP_BEGIN:
            return{
                ...state,
                loading: true
            }

        case GET_LOGIN_OTP_SUCCESS:
            return{
                ...state,
                loading: false
            }

        case GET_LOGIN_OTP_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error
            }

        case VALIDATE_LOGIN_TOKEN_BEGIN:
            return{
                ...state,
                loading: true
            }

        case VALIDATE_LOGIN_TOKEN_SUCCESS:
            return{
                ...state,
                loading: false,
                validateLoginToken: action.validateLoginToken
            }

        case VALIDATE_LOGIN_TOKEN_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error
            }

        case SKIP_EASYPIN_LOGIN:
            return{
                ...state,
                skip: action.skip
            }

        default: 
            return state;
    }
};

export default register;