import{
    CHECK_PAN_BEGIN,
    CHECK_PAN_FAILURE,
    CHECK_PAN_SUCCESS
}from '../index';

export const checkPanBegin = () => ({
    type: CHECK_PAN_BEGIN,
});

export const checkPanSuccess = (panExist) => ({
    type: CHECK_PAN_SUCCESS,
    panExist,
});

export const checkPanFailure = (error) => ({
    type: CHECK_PAN_FAILURE,
    error,
});