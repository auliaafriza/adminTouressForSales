import { TOUR_TRANSACTION_URL, CITIES_URL } from './apiUrl';
import apiClient from './apiClient';

export const getTourCategoryApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${TOUR_TRANSACTION_URL}/TourPaxTypeList`);
};

export const getTourTypeApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${TOUR_TRANSACTION_URL}/TourTypeList`);
};

export const getAllMovementTypesApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`/MovementModes`);
};

export const getCityInCountryApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${CITIES_URL}/CityInCountry`);
};

export const getCustomerListApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(
    // `/Companies/CompanyProfile/AdminSimplified?type=Customer`
    `/Companies/CompanyProfile/Sales/AdminSimplified?type=Customer`
  );
};

export const getUserIdCompanyApi = (id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(
    `/UserProfiles/CompanyUsers/ByCompanyCode?companyCode=${id}`
  );
};
