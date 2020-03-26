import { TOUR_TRANSACTION_URL } from './apiUrl';
import apiClient from './apiClient';

export const getOperatorListApi = (type, data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  let urlString = '';
  type == 'FixedDateVariable'
    ? (urlString = `${TOUR_TRANSACTION_URL}/TourOperatorList/Simple`)
    : (urlString = `${TOUR_TRANSACTION_URL}/TourOperatorList`);
  return apiClient.post(urlString, data);
};
