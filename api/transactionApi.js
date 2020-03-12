import apiClient from "./apiClient";
import { GET_TEMPLATE_URL, TOUR_OPERATOR_URL } from "./apiUrl";

export const getReadyPackageListApi = data => {
  return apiClient.get(`${GET_TEMPLATE_URL}/ReadyPackage/All`);
};

export const getSeriesPackageListApi = data => {
  return apiClient.get(`${GET_TEMPLATE_URL}/FixedPackage/All`);
};

export const getReadyPackageFixedPriceListApi = data => {
  return apiClient.get(`${GET_TEMPLATE_URL}/VariableDate/All`);
};

export const getSeriesPackageByIdApi = id => {
  return apiClient.get(`${GET_TEMPLATE_URL}/Fixed/${id}`);
};

export const getReadyPackageFixedPriceByIdApi = id => {
  return apiClient.get(`${GET_TEMPLATE_URL}/FixedDateVariable/${id}`);
};

export const getReadyPackageByIdApi = id => {
  return apiClient.get(`${GET_TEMPLATE_URL}/Ready/${id}`);
};

export const getTourOperatorProfileByIdApi = id => {
  return apiClient.get(`${TOUR_OPERATOR_URL}/ById/${id}`);
};
