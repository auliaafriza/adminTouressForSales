import {
  RESET_ACCOMMODATION_PROFILE,
  GET_ACCOMMODATION,
  SET_CITY_ACCOMMODATION
} from "./actionTypes";
import {
  getAccommodationProfileApi,
  getAccommodationRatingApi,
  getAccommodationAreaApi,
  getAccommodationLocationApi,
  getAccommodationTypeApi,
  getAccommodationFacilitiesApi
} from "../../api/accommodationApi";

export const resetAccommodationProfileAction = () => {
  return {
    type: RESET_ACCOMMODATION_PROFILE
  };
};

export const getAccommodationProfileAction = data => {
  return dispatch => {
    return dispatch({
      type: GET_ACCOMMODATION,
      payload: getAccommodationProfileApi(data)
    });
  };
};

export const setCityAccommodationAction = cityId => {
  return {
    type: SET_CITY_ACCOMMODATION,
    payload: cityId
  };
};

export const getAccommodationRatingAction = () => ({
  type: GET_ACCOMMODATION_RATINGS,
  payload: getAccommodationRatingApi()
});

export const getAccommodationAreaAction = () => ({
  type: GET_ACCOMMODATION_AREAS,
  payload: getAccommodationAreaApi()
});

export const getAccommodationLocationAction = () => ({
  type: GET_ACCOMMODATION_LOCATIONS,
  payload: getAccommodationLocationApi()
});

export const getAccommodationTypeAction = () => ({
  type: GET_ACCOMMODATION_TYPES,
  payload: getAccommodationTypeApi()
});

export const getAccommodationFacilitiesAction = () => ({
  type: GET_ACCOMMODATION_FACILITIES,
  payload: getAccommodationFacilitiesApi()
});
