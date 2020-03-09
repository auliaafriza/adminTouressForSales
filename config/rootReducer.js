import { combineReducers } from "redux";
// import { reducer as formReducer } from 'redux-form';
import authReducer from "../reducers/authReducer";
import transactionReducer from "../reducers/transactionReducer";

const reducers = {
  // form: formReducer,
  authReducer,
  transactionReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
