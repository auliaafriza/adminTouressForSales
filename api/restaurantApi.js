import apiClient from './apiClient';
import {
  GET_RESTAURANT_BY_FILTER_URL,
  GET_RESTAURANT_RATING_URL,
  GET_RESTAURANT_SPECIALIZATIONS_URL,
  GET_RESTAURANT_MENU_CLASSES_URL,
  GET_RESTAURANT_MENU_BY_ID_URL,
  GET_MENU_BY_ID_URL,
  GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM_URL,
} from './apiUrl';

const getRestaurantByFilterApi = data => {
  return apiClient.get(
    `${GET_RESTAURANT_BY_FILTER_URL}?cityId=${data.cityId}&ratingIds=${data.ratingIds}&locationIds=${data.locationIds}&specializationId=${data.specializationId}&menuClassId=${data.menuClassId}&facilityIds=${data.facilityIds}&requestedDate=${data.requestedDate}&pax=${data.pax}`
  );
};

const getRestaurantRatingApi = () => {
  return apiClient.get(GET_RESTAURANT_RATING_URL);
};

const getRestaurantSpecializationsApi = () => {
  return apiClient.get(GET_RESTAURANT_SPECIALIZATIONS_URL);
};

const getRestaurantMenuClassesApi = () => {
  return apiClient.get(GET_RESTAURANT_MENU_CLASSES_URL);
};

const getRestaurantMenuByIdApi = data => {
  return apiClient.get(`${GET_RESTAURANT_MENU_BY_ID_URL}?profileId=${data}`);
};

const getMenuByIdApi = id => {
  return apiClient.get(`${GET_MENU_BY_ID_URL}/${id}`);
};

const getRestaurantProfileByServiceItemApi = id => {
  return apiClient.get(`${GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM_URL}/${id}`);
};

export {
  getRestaurantByFilterApi,
  getRestaurantRatingApi,
  getRestaurantSpecializationsApi,
  getRestaurantMenuClassesApi,
  getRestaurantMenuByIdApi,
  getMenuByIdApi,
  getRestaurantProfileByServiceItemApi,
};
