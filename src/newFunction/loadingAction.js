import {
    SET_LOADING
} from '../action/index';

export const setLoading = (load) => ({
    type: SET_LOADING,
    load
});