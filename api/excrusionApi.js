import apiClient from './apiClient';
import {
  GET_EXCURSION_TYPES_URL,
  GET_EXCURSION_BY_FILTER_URL,
  GET_EXCURSION_BY_ID_URL,
} from './apiUrl';

const getExcursionTypesApi = () => {
  return apiClient.get(GET_EXCURSION_TYPES_URL);
};
const getExcursionByFilterApi = data => {
  return apiClient.get(
    `${GET_EXCURSION_BY_FILTER_URL}?cityid=${data.cityid}&attractionTypeId=${data.attractionTypeId}&requestedDate=${data.requestedDate}&pax=${data.pax}`
  );
};
const getExcursionByIdApi = id => {
  return apiClient.get(`${GET_EXCURSION_BY_ID_URL}/${id}`);
};

const getExcrusionDetailApi = Id => {
  return apiClient.get(`/AttractionObjects/ById/${Id}`);
};

export {
  getExcursionTypesApi,
  getExcursionByFilterApi,
  getExcursionByIdApi,
  getExcrusionDetailApi,
};
