import { TOUR_TRANSACTION_URL } from "./apiUrl";
import apiClient from "./apiClient";
export const getTourCategoryApi = () => {
  return apiClient.get(`${TOUR_TRANSACTION_URL}/TourPaxTypeList`);
};

export const getTourTypeApi = () => {
  return apiClient.get(`${TOUR_TRANSACTION_URL}/TourTypeList`);
};

export const getAllMovementTypesApi = () => {
  return apiClient.get(`/MovementModes`);
};
