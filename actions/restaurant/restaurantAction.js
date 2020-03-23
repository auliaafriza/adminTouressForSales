import {
  GET_RESTAURANT_BY_FILTER,
  GET_RESTAURANT_RATING,
  GET_RESTAURANT_SPECIALIZATIONS,
  GET_RESTAURANT_MENU_CLASSES,
  GET_RESTAURANT_MENU_BY_ID,
  GET_MENU_BY_ID,
  GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM,
  RESET_STATUS_RESTAURANT,
  RESET_STATUS_RESTAURANTS_BY_FILTER,
} from './actionTypes';
import {
  getRestaurantByFilterApi,
  getRestaurantRatingApi,
  getRestaurantMenuClassesApi,
  getRestaurantSpecializationsApi,
  getRestaurantMenuByIdApi,
  getMenuByIdApi,
  getRestaurantProfileByServiceItemApi,
} from '../../api/restaurantApi';

import store from '../../config/store';

const getRestaurantByFilter = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_BY_FILTER,
      payload: getRestaurantByFilterApi(data, authToken),
    });
  };
};

const getRestaurantRating = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_RATING,
      payload: getRestaurantRatingApi(authToken),
    });
  };
};

const getRestaurantSpecializations = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_SPECIALIZATIONS,
      payload: getRestaurantSpecializationsApi(authToken),
    });
  };
};

const getRestaurantMenuClasses = () => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_MENU_CLASSES,
      payload: getRestaurantMenuClassesApi(authToken),
    });
  };
};
const getRestaurantMenuById = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_MENU_BY_ID,
      payload: getRestaurantMenuByIdApi(data, authToken),
    });
  };
};
const getMenuById = id => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_MENU_BY_ID,
      payload: getMenuByIdApi(id, authToken),
    });
  };
};
const getRestaurantProfileByServiceItem = id => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM,
      payload: getRestaurantProfileByServiceItemApi(id, authToken),
    });
  };
};
const resetStatusRestaurant = () => {
  return dispatch => {
    return dispatch({
      type: RESET_STATUS_RESTAURANT,
    });
  };
};
const resetStatusRestaurantsByFilter = () => {
  return dispatch => {
    return dispatch({
      type: RESET_STATUS_RESTAURANTS_BY_FILTER,
    });
  };
};
export {
  getRestaurantByFilter,
  getRestaurantRating,
  getRestaurantSpecializations,
  getRestaurantMenuClasses,
  getRestaurantMenuById,
  getMenuById,
  getRestaurantProfileByServiceItem,
  resetStatusRestaurant,
  resetStatusRestaurantsByFilter,
};
