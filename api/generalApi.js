import { TOUR_TRANSACTION_URL, CITIES_URL } from './apiUrl';
import apiClient from './apiClient';
export const getTourCategoryApi = () => {
  return apiClient.get(`${TOUR_TRANSACTION_URL}/TourPaxTypeList`);
};

export const getTourTypeApi = () => {
  return apiClient.get(`${TOUR_TRANSACTION_URL}/TourTypeList`);
};

export const getAllMovementTypesApi = () => {
  return apiClient.get(`/MovementModes`);
};

export const getCityInCountryApi = () => {
  return apiClient.get(`${CITIES_URL}/CityInCountry`);
};

export const getCustomerListApi = () => {
  return apiClient.get(
    // `/Companies/CompanyProfile/AdminSimplified?type=Customer`
    `/Companies/CompanyProfile/Sales/AdminSimplified?type=Customer`
  );
};

export const getUserIdCompanyApi = id => {
  return apiClient.get(
    `/UserProfiles/CompanyUsers/ByCompanyCode?companyCode=${id}`
  );
};
