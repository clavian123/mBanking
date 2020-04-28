import { combineReducers } from 'redux';
import login from './login';
import home from './home';
import transfer from './transfer';

export default combineReducers({
    login, 
    home, 
    transfer
});