import { TOUR_TRANSACTION_URL } from "./apiUrl";
import apiClient from "./apiClient";
export const getOperatorListApi = (type, data) => {
  return apiClient.post(
    type == "FixedDateVariable"
      ? `${TOUR_TRANSACTION_URL}/TourOperatorList/Simple`
      : `${TOUR_TRANSACTION_URL}/TourOperatorList`,
    data
  );
};
