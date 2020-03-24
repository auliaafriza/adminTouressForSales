import {
  getTourCategoryApi,
  getTourTypeApi,
  getAllMovementTypesApi,
  getCityInCountryApi,
  getCustomerListApi,
  getUserIdCompanyApi,
  getCountryApi,
  getIdentityTypeApi,
  getGuestTitleTypeApi,
  getTotalCurrenciesApi,
  postSimpleRegisterApi,
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
  GET_COUNTRIES,
  GET_GUEST_TITLE_TYPE,
  GET_IDENTITY_TYPE,
  GET_TOTAL_CURRENCIES,
  POST_SIMPLE_REGISTER,
  RESET_SIMPLE_REGISTER,
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

export const getCountriesAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return {
    type: GET_COUNTRIES,
    payload: getCountryApi(authToken),
  };
};

export const getGuestTitleTypeAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_GUEST_TITLE_TYPE,
      payload: getGuestTitleTypeApi(authToken),
    });
  };
};

export const getIdentityTypeAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_IDENTITY_TYPE,
      payload: getIdentityTypeApi(authToken),
    });
  };
};

export const getTotalCurrencies = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_TOTAL_CURRENCIES,
      payload: getTotalCurrenciesApi(authToken),
    });
  };
};

export const postSimpleRegister = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: POST_SIMPLE_REGISTER,
      payload: postSimpleRegisterApi(data, authToken),
    });
  };
};

export const resetSimpleRegister = () => {
  return dispatch => {
    return dispatch({
      type: RESET_SIMPLE_REGISTER,
    });
  };
};
