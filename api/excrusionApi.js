import apiClient from './apiClient';
import {
  GET_EXCURSION_TYPES_URL,
  GET_EXCURSION_BY_FILTER_URL,
  GET_EXCURSION_BY_ID_URL,
} from './apiUrl';

const getExcursionTypesApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(GET_EXCURSION_TYPES_URL);
};
const getExcursionByFilterApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(
    `${GET_EXCURSION_BY_FILTER_URL}?cityid=${data.cityid}&attractionTypeId=${data.attractionTypeId}&requestedDate=${data.requestedDate}&pax=${data.pax}`
  );
};
const getExcursionByIdApi = (id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${GET_EXCURSION_BY_ID_URL}/${id}`);
};

const getExcrusionDetailApi = (Id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`/AttractionObjects/ById/${Id}`);
};

export {
  getExcursionTypesApi,
  getExcursionByFilterApi,
  getExcursionByIdApi,
  getExcrusionDetailApi,
};
