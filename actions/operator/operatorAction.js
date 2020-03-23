import {
  GET_TOUR_OPERATOR_LIST,
  SET_OPERATOR,
  RESET_TOUR_OPERATOR_LIST,
} from './actionTypes';
import { getOperatorListApi } from '../../api/operatorApi';

export const getOperatorListAction = (type, data) => {
  return dispatch => {
    return dispatch({
      type: GET_TOUR_OPERATOR_LIST,
      payload: getOperatorListApi(type, data),
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

export const setOperatorAction = () => {
  return {
    type: SET_OPERATOR,
  };
};
