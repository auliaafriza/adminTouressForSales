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

const getRestaurantByFilter = data => {
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_BY_FILTER,
      payload: getRestaurantByFilterApi(data),
    });
  };
};

const getRestaurantRating = () => {
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_RATING,
      payload: getRestaurantRatingApi(),
    });
  };
};

const getRestaurantSpecializations = () => {
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_SPECIALIZATIONS,
      payload: getRestaurantSpecializationsApi(),
    });
  };
};

const getRestaurantMenuClasses = () => {
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_MENU_CLASSES,
      payload: getRestaurantMenuClassesApi(),
    });
  };
};
const getRestaurantMenuById = data => {
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_MENU_BY_ID,
      payload: getRestaurantMenuByIdApi(data),
    });
  };
};
const getMenuById = id => {
  return dispatch => {
    return dispatch({
      type: GET_MENU_BY_ID,
      payload: getMenuByIdApi(id),
    });
  };
};
const getRestaurantProfileByServiceItem = id => {
  return dispatch => {
    return dispatch({
      type: GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM,
      payload: getRestaurantProfileByServiceItemApi(id),
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
