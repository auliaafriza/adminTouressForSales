import {
  getTourCategoryApi,
  getTourTypeApi,
  getAllMovementTypesApi,
  getCityInCountryApi,
  getCustomerListApi,
  getUserIdCompanyApi,
} from '../../api/generalApi';
import {
  GET_TOUR_TYPE,
  GET_TOUR_CATEGORY,
  GET_ALL_MOVEMENT_TYPES,
  GET_CITY_IN_COUNTRY,
  SET_GUEST,
  GET_CUSTOMER_LIST,
  RESET_CUSTOMER_LIST,
  GET_USER_ID_COMPANY,
} from './actionTypes';

export const getTourTypeAction = () => {
  return dispatch => {
    return dispatch({
      type: GET_TOUR_TYPE,
      payload: getTourTypeApi(),
    });
  };
};
export const getTourCategoryAction = () => {
  return dispatch => {
    return dispatch({
      type: GET_TOUR_CATEGORY,
      payload: getTourCategoryApi(),
    });
  };
};

export const getAllMovementTypesAction = () => {
  return dispatch => {
    return dispatch({
      type: GET_ALL_MOVEMENT_TYPES,
      payload: getAllMovementTypesApi(),
    });
  };
};

export const getCityInCountryAction = () => {
  return dispatch => {
    return dispatch({
      type: GET_CITY_IN_COUNTRY,
      payload: getCityInCountryApi(),
    });
  };
};

export const setGuestAction = () => {
  return {
    type: SET_GUEST,
  };
};

export const getListCustomerAction = () => {
  return {
    type: GET_CUSTOMER_LIST,
    payload: getCustomerListApi(),
  };
};

export const getUserIdCompanyAction = id => {
  return {
    type: GET_USER_ID_COMPANY,
    payload: getUserIdCompanyApi(id),
  };
};

export const resetListCustomerAction = () => {
  return {
    type: RESET_CUSTOMER_LIST,
  };
};
