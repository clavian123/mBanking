import{
    CHECK_PAN_BEGIN,
    CHECK_PAN_SUCCESS,
    CHECK_PAN_FAILURE
}from '../action/index';

initialState = {
    panExist: false,
    loading: false,
    error: null
};

const register = (state = initialState, action) => {
    switch(action.type){
        case CHECK_PAN_BEGIN:
            return{
                ...state,
                loading: false,
                error: null
            }
        
        case CHECK_PAN_FAILURE:
            return{
                ...state,
                panExist: false,
                loading: false,
                error: action.error
            }
        
        case CHECK_PAN_SUCCESS:
            return{
                ...state,
                panExist: action.panExist
            }
        
        default: 
            return state;
    }
};

export default register;