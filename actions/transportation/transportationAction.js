import {
  SET_DRIVING,
  SET_AIRPORT,
  GET_DRIVING,
  GET_AIRPORT,
  GET_LIST_AIRPORT,
  GET_TRANSPORTATION_PROFILE_RATINGS,
  GET_TRANSPORTATION_PROFILE_CATEGORIES,
  GET_TRANSPORTATION_PROFILES,
  GET_TRANSPORTATION_TYPES,
  GET_TRANSPORTATION_SEAT_TYPES,
  GET_TRANSPORTATION_UNITS_FILTER,
  RESET_STATUS_TRANSPORTATION,
  RESET_STATUS_TRANSPORTATION_UNITS_FILTER,
  GET_DURATION_FULFILLED,
  GET_DURATION_REJECTED,
  GET_DURATION,
} from './actionTypes';
import {
  getDurationApi,
  getAirportApi,
  getAirportListApi,
  getTransportationProfileRatingsApi,
  getTransportationProfileCategoriesApi,
  getTransportationProfilesApi,
  getTransportationTypesApi,
  getTransportationSeatTypesApi,
  getTransportationUnitsFilterApi,
} from '../../api/transportationApi';

import store from '../../config/store';

export const setDrivingAction = item => {
  return {
    type: SET_DRIVING,
    item,
  };
};

export const setAirportAction = airport => {
  return {
    type: SET_AIRPORT,
    airport,
  };
};

export const getDrivingAction = airport => {
  return {
    type: GET_DRIVING,
    airport,
  };
};

export const getAirportAction = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_AIRPORT,
      payload: getAirportApi(data, authToken),
    });
  };
};

//DURATION TRANSPORTATION BY TYPE
// ID TO ID
// ADDRESS TO ID
// ID TO ADDRESS
// ADDRESS TO ADDRESS
export const getDurationAction = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_DURATION,
      payload: getDurationApi(data, authToken),
    });
    // .then(response =>
    //   dispatch({
    //     type: GET_DURATION_FULFILLED,
    //     payload: response.value.data,
    //   })
    // )
    // .catch(error => {
    //   dispatch({
    //     type: GET_DURATION_REJECTED,
    //     payload: error,
    //   });
    // });
  };
};

export const getListAirportAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_LIST_AIRPORT,
      payload: getAirportListApi(authToken),
    });
  };
};

export const getTransportationProfileRatings = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_PROFILE_RATINGS,
      payload: getTransportationProfileRatingsApi(authToken),
    });
  };
};

export const getTransportationProfileCategories = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_PROFILE_CATEGORIES,
      payload: getTransportationProfileCategoriesApi(authToken),
    });
  };
};

export const getTransportationProfiles = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_PROFILES,
      payload: getTransportationProfilesApi(authToken),
    });
  };
};

export const getTransportationTypes = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_TYPES,
      payload: getTransportationTypesApi(authToken),
    });
  };
};

export const getTransportationSeatTypes = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_SEAT_TYPES,
      payload: getTransportationSeatTypesApi(authToken),
    });
  };
};

export const getTransportationUnitsFilter = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_UNITS_FILTER,
      payload: getTransportationUnitsFilterApi(data, authToken),
    });
  };
};

export const resetStatusTransportation = () => {
  return dispatch => {
    return dispatch({
      type: RESET_STATUS_TRANSPORTATION,
    });
  };
};

export const resetStatusTransportationUnitsFilter = () => {
  return dispatch => {
    return dispatch({
      type: RESET_STATUS_TRANSPORTATION_UNITS_FILTER,
    });
  };
};
