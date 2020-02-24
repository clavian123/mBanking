import { combineReducers } from 'redux';
import login from './login';
import home from './home';

export default combineReducers({login, home});