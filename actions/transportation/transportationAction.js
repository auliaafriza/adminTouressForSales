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
  return dispatch => {
    return dispatch({
      type: GET_AIRPORT,
      payload: getAirportApi(data),
    });
  };
};

//DURATION TRANSPORTATION BY TYPE
// ID TO ID
// ADDRESS TO ID
// ID TO ADDRESS
// ADDRESS TO ADDRESS
export const getDurationAction = (type, data) => {
  return dispatch => {
    return dispatch({
      type: GET_DURATION,
      payload: getDurationApi(type, data),
    });
  };
};

export const getListAirportAction = () => {
  return dispatch => {
    return dispatch({
      type: GET_LIST_AIRPORT,
      payload: getAirportListApi(),
    });
  };
};

export const getTransportationProfileRatings = () => {
  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_PROFILE_RATINGS,
      payload: getTransportationProfileRatingsApi(),
    });
  };
};

export const getTransportationProfileCategories = () => {
  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_PROFILE_CATEGORIES,
      payload: getTransportationProfileCategoriesApi(),
    });
  };
};

export const getTransportationProfiles = () => {
  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_PROFILES,
      payload: getTransportationProfilesApi(),
    });
  };
};

export const getTransportationTypes = () => {
  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_TYPES,
      payload: getTransportationTypesApi(),
    });
  };
};

export const getTransportationSeatTypes = () => {
  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_SEAT_TYPES,
      payload: getTransportationSeatTypesApi(),
    });
  };
};

export const getTransportationUnitsFilter = data => {
  return dispatch => {
    return dispatch({
      type: GET_TRANSPORTATION_UNITS_FILTER,
      payload: getTransportationUnitsFilterApi(data),
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
