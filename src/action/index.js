import { SYNC_ASYNC, LOGIN, LOGOUT } from './actionTypes';

export const syncAsync = (email, pin) => ({
    type: SYNC_ASYNC,
    email,
    pin,
})

export const login = (email, pin) => ({
    type: LOGIN,
    email,
    pin
})

export const logout =  () => ({
    type: LOGOUT
})