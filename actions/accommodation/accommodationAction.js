import {
  RESET_ACCOMMODATION_PROFILE,
  GET_ACCOMMODATION,
  SET_CITY_ACCOMMODATION,
  GET_ACCOMMODATION_FACILITIES,
  GET_ACCOMMODATION_RATINGS,
  GET_ACCOMMODATION_AREAS,
  GET_ACCOMMODATION_LOCATIONS,
  GET_ACCOMMODATION_TYPES,
} from './actionTypes';
import {
  getAccommodationProfileApi,
  getAccommodationRatingApi,
  getAccommodationAreaApi,
  getAccommodationLocationApi,
  getAccommodationTypeApi,
  getAccommodationFacilitiesApi,
} from '../../api/accommodationApi';

export const resetAccommodationProfileAction = () => {
  return dispatch => {
    return dispatch ({
      type: RESET_ACCOMMODATION_PROFILE,
    });
  };
};

export const getAccommodationProfileAction = data => {
  return dispatch => {
    return dispatch ({
      type: GET_ACCOMMODATION,
      payload: getAccommodationProfileApi (data),
    });
  };
};

export const setCityAccommodationAction = CityId => {
  return dispatch => {
    return dispatch ({
      type: SET_CITY_ACCOMMODATION,
      payload: CityId,
    });
  };
};

export const getAccommodationRatingAction = () => {
  return dispatch => {
    return dispatch ({
      type: GET_ACCOMMODATION_RATINGS,
      payload: getAccommodationRatingApi (),
    });
  };
};

export const getAccommodationAreaAction = () => {
  return dispatch => {
    return dispatch ({
      type: GET_ACCOMMODATION_AREAS,
      payload: getAccommodationAreaApi (),
    });
  };
};

export const getAccommodationLocationAction = () => {
  return dispatch => {
    return dispatch ({
      type: GET_ACCOMMODATION_LOCATIONS,
      payload: getAccommodationLocationApi (),
    });
  };
};

export const getAccommodationTypeAction = () => {
  return dispatch => {
    return dispatch ({
      type: GET_ACCOMMODATION_TYPES,
      payload: getAccommodationTypeApi (),
    });
  };
};

export const getAccommodationFacilitiesAction = () => {
  return dispatch => {
    return dispatch ({
      type: GET_ACCOMMODATION_FACILITIES,
      payload: getAccommodationFacilitiesApi (),
    });
  };
};
