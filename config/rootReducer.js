import { combineReducers } from "redux";
// import { reducer as formReducer } from 'redux-form';
import authReducer from "../reducers/authReducer";

const reducers = {
  // form: formReducer,
  authReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
