import {
  GET_TOUR_OPERATOR_LIST,
  SET_OPERATOR,
  RESET_TOUR_OPERATOR_LIST,
} from './actionTypes';
import { getOperatorListApi } from '../../api/operatorApi';

import store from '../../config/store';

export const getOperatorListAction = (type, data) => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_TOUR_OPERATOR_LIST,
      payload: getOperatorListApi(type, data, authToken),
    });
  };
};

export const resetOperatorListAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_TOUR_OPERATOR_LIST,
    });
  };
};

export const setOperatorAction = data => {
  return {
    type: SET_OPERATOR,
    payload: data,
  };
};
