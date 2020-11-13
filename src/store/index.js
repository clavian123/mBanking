import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducer/index';

export default store = createStore(rootReducer, applyMiddleware(thunk));

// import { combineReducers } from "redux";

// import { register, login, home, transfer, payment } from "../reducer";
// import authReducer from "./Auth/reducers";

// const rootReducer = combineReducers({
//   register, login, home, transfer, payment,
//   auth: authReducer
// });

// export default rootReducer;