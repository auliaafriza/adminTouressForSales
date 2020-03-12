import { combineReducers } from "redux";
// import { reducer as formReducer } from 'redux-form';
import authReducer from "../reducers/authReducer";
import transactionReducer from "../reducers/transactionReducer";
import generalReducer from "../reducers/generalReducer";
import operatorReducer from "../reducers/operatorReducer";
import transportationReducer from "../reducers/transportationReducer";

const reducers = {
  authReducer,
  transactionReducer,
  generalReducer,
  operatorReducer,
  transportationReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
