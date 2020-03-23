import {
  RESET_ACCOMMODATION_PROFILE,
  GET_ACCOMMODATION,
  SET_CITY_ACCOMMODATION,
  GET_ACCOMMODATION_FACILITIES,
  GET_ACCOMMODATION_RATINGS,
  GET_ACCOMMODATION_AREAS,
  GET_ACCOMMODATION_LOCATIONS,
  GET_ACCOMMODATION_TYPES,
  GET_ACCOMMODATION_BY_ID,
  GET_ACCOMMODATION_ROOMS,
  GET_ACCOMMODATION_BY_SERVICE_ITEM_ID,
  RESET_GET_ACOOMMODATION,
} from './actionTypes';
import {
  getAccommodationProfileApi,
  getAccommodationRatingApi,
  getAccommodationAreaApi,
  getAccommodationLocationApi,
  getAccommodationTypeApi,
  getAccommodationFacilitiesApi,
  getAccommodationByIdApi,
  getAccommodationRoomsApi,
  getAccommodationByServiceItemIdApi,
} from '../../api/accommodationApi';

import store from '../../config/store';

export const resetAccommodationProfileAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_ACCOMMODATION_PROFILE,
    });
  };
};

export const getAccommodationProfileAction = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION,
      payload: getAccommodationProfileApi(data, authToken),
    });
  };
};

export const setCityAccommodationAction = CityId => {
  return dispatch => {
    return dispatch({
      type: SET_CITY_ACCOMMODATION,
      payload: CityId,
    });
  };
};

export const getAccommodationRatingAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION_RATINGS,
      payload: getAccommodationRatingApi(authToken),
    });
  };
};

export const getAccommodationAreaAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION_AREAS,
      payload: getAccommodationAreaApi(authToken),
    });
  };
};

export const getAccommodationLocationAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION_LOCATIONS,
      payload: getAccommodationLocationApi(authToken),
    });
  };
};

export const getAccommodationTypeAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION_TYPES,
      payload: getAccommodationTypeApi(authToken),
    });
  };
};

export const getAccommodationFacilitiesAction = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION_FACILITIES,
      payload: getAccommodationFacilitiesApi(authToken),
    });
  };
};

export const getAccommodationByIdAction = Id => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION_BY_ID,
      payload: getAccommodationByIdApi(Id, authToken),
    });
  };
};

export const getAccommodationRoomsAction = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION_ROOMS,
      payload: getAccommodationRoomsApi(data, authToken),
    });
  };
};

export const getAccommodationByServiceItemIdAction = Id => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION_BY_SERVICE_ITEM_ID,
      payload: getAccommodationByServiceItemIdApi(Id, authToken),
    });
  };
};

export const resetGetAccommodationAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_GET_ACOOMMODATION,
    });
  };
};
