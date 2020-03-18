import {TOUR_TRANSACTION_URL, PLACE_URL} from './apiUrl';
import apiClient from './apiClient';
export const getDurationApi = (type, data) => {
  let urlString = null;
  if (data.FromId && data.ToId)
    urlString = `${TOUR_TRANSACTION_URL}/Movement?originSesrviceItemId=' +
        data.FromId +
        '&destinationServiceItemId=' +
        data.ToId +
        '&mode=DRIVING`;
  else if (!data.FromId && data.ToId)
    urlString = `${TOUR_TRANSACTION_URL}/Movement?originAddress=' +
        data.FromAddress +
        '&destinationServiceItemId=' +
        data.ToId +
        '&mode=DRIVING`;
  else if (data.FromId && !data.ToId)
    urlString = `${TOUR_TRANSACTION_URL}/Movement?originServiceItemId=' +
        data.FromId +
        '&destinationAddress=' +
        data.ToAddress +
        '&mode=DRIVING`;
  else
    urlString = `${TOUR_TRANSACTION_URL}/Movement?originAddress=' +
        data.FromAddress +
        '&destinationAddress=' +
        data.ToAddress +
        '&mode=DRIVING`;

  return apiClient.get (urlString);
};

export const getAirportApi = region => {
  return apiClient.get (`${PLACE_URL}/Get/ByRegion/${region}`);
};

export const getAirportListApi = () => {
  return apiClient.get (`${PLACE_URL}/Get/ByPlaceType/1`);
};
