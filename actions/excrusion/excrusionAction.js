import {
  GET_EXCURSION_TYPES,
  GET_EXCURSION_BY_FILTER,
  RESET_STATUS_EXCURSION,
  GET_EXCURSION_BY_ID,
  GET_EXCRUSION_DETAIL,
  RESET_GET_EXCRUSION_DETAIL,
} from './actionTypes';
import {
  getExcursionTypesApi,
  getExcursionByFilterApi,
  getExcursionByIdApi,
  getExcrusionDetailApi,
} from '../../api/excrusionApi';

import store from '../../config/store';

const getExcursionTypes = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_EXCURSION_TYPES,
      payload: getExcursionTypesApi(authToken),
    });
  };
};
const getExcursionByFilter = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_EXCURSION_BY_FILTER,
      payload: getExcursionByFilterApi(data, authToken),
    });
  };
};
const resetStatusExcursion = () => {
  return dispatch => {
    return dispatch({
      type: RESET_STATUS_EXCURSION,
    });
  };
};
const getExcursionById = id => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_EXCURSION_BY_ID,
      payload: getExcursionByIdApi(id, authToken),
    });
  };
};

const getExcrusionDetail = id => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_EXCRUSION_DETAIL,
      payload: getExcrusionDetailApi(id, authToken),
    });
  };
};

const resetExcrusionDetail = () => {
  return dispatch => {
    return dispatch({
      type: RESET_GET_EXCRUSION_DETAIL,
    });
  };
};

export {
  getExcursionTypes,
  getExcursionByFilter,
  resetStatusExcursion,
  getExcursionById,
  getExcrusionDetail,
  resetExcrusionDetail,
};
