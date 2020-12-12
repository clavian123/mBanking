import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import home from './home';
import transfer from './transfer';
import payment from './payment';
import loading from './loading';
import newLogin from './newLogin';
import bankingSummary from './bankingSummary';

export default combineReducers({
    loading,
    newLogin,
    register,
    login, 
    home, 
    transfer,
    payment,
    bankingSummary
});