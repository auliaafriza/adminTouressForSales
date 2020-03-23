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

const getExcursionTypes = () => {
  return dispatch => {
    return dispatch({
      type: GET_EXCURSION_TYPES,
      payload: getExcursionTypesApi(),
    });
  };
};
const getExcursionByFilter = data => {
  return dispatch => {
    return dispatch({
      type: GET_EXCURSION_BY_FILTER,
      payload: getExcursionByFilterApi(data),
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
  return dispatch => {
    return dispatch({
      type: GET_EXCURSION_BY_ID,
      payload: getExcursionByIdApi(id),
    });
  };
};

const getExcrusionDetail = id => {
  return dispatch => {
    return dispatch({
      type: GET_EXCRUSION_DETAIL,
      payload: getExcrusionDetailApi(id),
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
