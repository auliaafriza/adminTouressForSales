import apiClient from './apiClient';
import {
  ACCOMMODATION_PROFILE_URL,
  GET_ACCOMMODATION_ROOMS_URL,
} from './apiUrl';

export const getAccommodationProfileApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.post(
    `${ACCOMMODATION_PROFILE_URL}/v2/ByCity/ShowPrice?city=${data.cityId}&requestedDate=${data.requestedDate}&useExtraBed=${data.useExtraBed}&useChildExtraBed=${data.useChildExtraBed}&useSharingBed=${data.useSharingBed}&sharingRoomPax=${data.sharingRoomPax}&singleRoomPax=${data.singleRoomPax}&checkOutDate=${data.checkOutDate}`,
    data.dataDemoPrice
  );
};

export const getAccommodationRatingApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`/AccommodationRatings`);
};

export const getAccommodationLocationApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`/AccommodationLocations`);
};

export const getAccommodationTypeApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`/AccommodationTypes`);
};

export const getAccommodationFacilitiesApi = authToken => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`/AccommodationFacilities`);
};

export const getAccommodationAreaApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`/Areas/ByCity?cityId=${data.cityId}`);
};

export const getAccommodationByIdApi = (Id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`/AccommodationProfiles?ID=${Id}`);
};

export const getAccommodationRoomsApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(
    `${GET_ACCOMMODATION_ROOMS_URL}?profileId=${data.profileId}&requestedDate=${data.requestedDate}&endDate=${data.checkOutDate}&useExtraBed=${data.useExtraBed}&useChildExtraBed=${data.useChildExtraBed}&useSharingBed=${data.useSharingBed}&sharingRoomPax=${data.sharingRoomPax}&singleRoomPax=${data.singleRoomPax}`
  );
};

export const getAccommodationByServiceItemIdApi = (Id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`/AccommodationProfiles/ByServiceItemId/${Id}`);
};
