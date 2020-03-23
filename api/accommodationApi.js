import apiClient from './apiClient';
import {
  ACCOMMODATION_PROFILE_URL,
  GET_ACCOMMODATION_ROOMS_URL,
} from './apiUrl';

export const getAccommodationProfileApi = data => {
  // return apiClient.post(
  //   `${ACCOMMODATION_PROFILE_URL}/v2/Filter/ShowPrice?cityId=${data.cityId}&ratingId=${data.ratingId}&areaId=${data.areaId}&locationId=${data.locationId}&typeId=${data.typeId}&facilityId=${data.facilityId}&promoOnly=${data.promoOnly}&requestedDate=${data.requestedDate}&useExtraBed=${data.useExtraBed}&useChildExtraBed=${data.useChildExtraBed}&useSharingBed=${data.useSharingBed}&sharingRoomPax=${data.sharingRoomPax}&singleRoomPax=${data.singleRoomPax}&checkOutDate=${data.checkOutDate}`,
  //   data.dataDemoPrice
  // );
  return apiClient.post(
    `${ACCOMMODATION_PROFILE_URL}/v2/ByCity/ShowPrice?city=${data.cityId}&requestedDate=${data.requestedDate}&useExtraBed=${data.useExtraBed}&useChildExtraBed=${data.useChildExtraBed}&useSharingBed=${data.useSharingBed}&sharingRoomPax=${data.sharingRoomPax}&singleRoomPax=${data.singleRoomPax}&checkOutDate=${data.checkOutDate}`,
    data.dataDemoPrice
  );
};

export const getAccommodationRatingApi = () => {
  return apiClient.get(`/AccommodationRatings`);
};

export const getAccommodationLocationApi = () => {
  return apiClient.get(`/AccommodationLocations`);
};

export const getAccommodationTypeApi = () => {
  return apiClient.get(`/AccommodationTypes`);
};

export const getAccommodationFacilitiesApi = () => {
  return apiClient.get(`/AccommodationFacilities`);
};

export const getAccommodationAreaApi = cityId => {
  return apiClient.get(`/Areas/ByCity?cityId=${cityId}`);
};

export const getAccommodationByIdApi = Id => {
  return apiClient.get(`/AccommodationProfiles?ID=${Id}`);
};

export const getAccommodationRoomsApi = data => {
  return apiClient.get(
    `${GET_ACCOMMODATION_ROOMS_URL}?profileId=${data.profileId}&requestedDate=${data.requestedDate}&endDate=${data.checkOutDate}&useExtraBed=${data.useExtraBed}&useChildExtraBed=${data.useChildExtraBed}&useSharingBed=${data.useSharingBed}&sharingRoomPax=${data.sharingRoomPax}&singleRoomPax=${data.singleRoomPax}`
  );
};

export const getAccommodationByServiceItemIdApi = Id => {
  return apiClient.get(`/AccommodationProfiles/ByServiceItemId/${Id}`);
};
