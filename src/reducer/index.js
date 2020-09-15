import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import home from './home';
import transfer from './transfer';
import payment from './payment';

export default combineReducers({
    register,
    login, 
    home, 
    transfer,
    payment
});