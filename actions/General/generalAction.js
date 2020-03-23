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

import store from '../../config/store';

export const getTourTypeAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_TOUR_TYPE,
      payload: getTourTypeApi(authToken),
    });
  };
};
export const getTourCategoryAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_TOUR_CATEGORY,
      payload: getTourCategoryApi(authToken),
    });
  };
};

export const getAllMovementTypesAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ALL_MOVEMENT_TYPES,
      payload: getAllMovementTypesApi(authToken),
    });
  };
};

export const getCityInCountryAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_CITY_IN_COUNTRY,
      payload: getCityInCountryApi(authToken),
    });
  };
};

export const setGuestAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_GUEST,
      payload: data,
    });
  };
};

export const getListCustomerAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return {
    type: GET_CUSTOMER_LIST,
    payload: getCustomerListApi(authToken),
  };
};

export const getUserIdCompanyAction = id => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return {
    type: GET_USER_ID_COMPANY,
    payload: getUserIdCompanyApi(id, authToken),
  };
};

export const resetListCustomerAction = () => {
  return {
    type: RESET_CUSTOMER_LIST,
  };
};
