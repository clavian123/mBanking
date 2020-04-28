import {
    CHECK_CLIENT_DESTINATION_BEGIN,
    CHECK_CLIENT_DESTINATION_SUCCESS,
    CHECK_CLIENT_DESTINATION_EMPTY,
    CHECK_CLIENT_DESTINATION_FAILURE,
    SAVE_CLIENT_DESTINATION_BEGIN,
    SAVE_CLIENT_DESTINATION_SUCCESS,
    SAVE_CLIENT_DESTINATION_FAILURE,
    GET_LIST_CLIENT_DESTINATION_BEGIN,
    GET_LIST_CLIENT_DESTINATION_SUCCESS,
    GET_LIST_CLIENT_DESTINATION_FAILURE,
    TRANSFER_PROCESS_BEGIN,
    TRANSFER_PROCESS_SUCCESS,
    TRANSFER_PROCESS_FAILURE,
} from '../action/index';

initialState = {
    newDest: {
        accNumber: '',
        fullName: '',
    },
    listDest: [],
    loading: false,
    error: null
};

const transfer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_CLIENT_DESTINATION_BEGIN:
            return {
                ...state,
                newDest: {
                    accNumber: '',
                    fullName: ''
                },
                loading: true
            };

        case CHECK_CLIENT_DESTINATION_SUCCESS:
            return {
                ...state,
                loading: false,
                newDest: {
                    accNumber: action.accNumber,
                    fullName: action.fullName
                }
            };

        case CHECK_CLIENT_DESTINATION_EMPTY:
            return {
                ...state,
                loading: false,
                newDest: {
                    accNumber: '',
                    fullName: ''
                },
            };

        case CHECK_CLIENT_DESTINATION_FAILURE:
            return {
                ...state,
                loading: false,
                newDest: {
                    accNumber: '',
                    fullName: ''
                },
                error: action.error
            };

        case SAVE_CLIENT_DESTINATION_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case SAVE_CLIENT_DESTINATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };

        case SAVE_CLIENT_DESTINATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case GET_LIST_CLIENT_DESTINATION_BEGIN:
            return {
                ...state,
                loading: true
            };

        case GET_LIST_CLIENT_DESTINATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                listDest: action.listDest
            };

        case GET_LIST_CLIENT_DESTINATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                listDest: []
            };

        case TRANSFER_PROCESS_BEGIN:
            return {
                ...state,
                loading: true
            };

        case TRANSFER_PROCESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case TRANSFER_PROCESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        
        default:
            return state;
    }
};

export default transfer;