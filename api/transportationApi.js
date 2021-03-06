import {
  TOUR_TRANSACTION_URL,
  PLACE_URL,
  GET_TRANSPORTATION_PROFILE_RATINGS_URL,
  GET_TRANSPORTATION_PROFILE_CATEGORIES_URL,
  GET_TRANSPORTATION_PROFILES_URL,
  GET_TRANSPORTATION_TYPES_URL,
  GET_TRANSPORTATION_SEAT_TYPES_URL,
  GET_TRANSPORTATION_UNITS_FILTER_URL,
  GET_TRANSPORTATION_UNIT_BY_ID_URL,
} from './apiUrl';

import apiClient from './apiClient';

export const getDurationApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  let urlString = null;
  if (data.FromId && data.ToId)
    urlString = `${TOUR_TRANSACTION_URL}/Movement?originSesrviceItemId=${data.FromId}&destinationServiceItemId=${data.ToId}&mode=DRIVING`;
  else if (!data.FromId && data.ToId)
    urlString = `${TOUR_TRANSACTION_URL}/Movement?originAddress=${data.FromAddress}&destinationServiceItemId=${data.ToId}&mode=DRIVING`;
  else if (data.FromId && !data.ToId)
    urlString = `${TOUR_TRANSACTION_URL}/Movement?originServiceItemId=${data.FromId}&destinationAddress=${data.ToAddress}&mode=DRIVING`;
  else
    urlString = `${TOUR_TRANSACTION_URL}/Movement?originAddress=${data.FromAddress}&destinationAddress=${data.ToAddress}&mode=DRIVING`;

  return apiClient.get(urlString);
};

export const getAirportApi = (region, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${PLACE_URL}/Get/ByRegion/${region}`);
};

export const getAirportListApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${PLACE_URL}/Get/ByPlaceType/1`);
};

export const getTransportationProfileRatingsApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(GET_TRANSPORTATION_PROFILE_RATINGS_URL);
};

export const getTransportationProfileCategoriesApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(GET_TRANSPORTATION_PROFILE_CATEGORIES_URL);
};

export const getTransportationProfilesApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(GET_TRANSPORTATION_PROFILES_URL);
};

export const getTransportationTypesApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(GET_TRANSPORTATION_TYPES_URL);
};

export const getTransportationSeatTypesApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(GET_TRANSPORTATION_SEAT_TYPES_URL);
};

export const getTransportationUnitsFilterApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(
    `${GET_TRANSPORTATION_UNITS_FILTER_URL}?fromCity=${data.fromCity}&toCities=${data.toCities}&RatingId=${data.RatingId}&seatTypeId=${data.seatTypeId}&typeId=${data.typeId}&requestedDate=${data.requestedDate}`
  );
};

export const getTransportationUnitByIdApi = (id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${GET_TRANSPORTATION_UNIT_BY_ID_URL}/${id}`);
};
