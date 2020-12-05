import {
    SET_LOADING
} from '../action/index';

initialState = {
    load: false
};

const loading = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING: 
            return {
                load: action.load
            }
        default: 
            return state;
    }
};

export default loading;