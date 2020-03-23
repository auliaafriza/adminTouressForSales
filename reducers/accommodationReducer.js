import * as types from '../actions/accommodation/actionTypes';

const initialState = {
  loading: false,
  listAccomodation: [],
  isAccomodation: '',
  accomodationFilter: [],
  isAccomodationFilter: null,
  cityAccommodation: [],
  accommodationRatings: [],
  accommodationFacilities: [],
  accommodationTypes: [],
  accommodationLocations: [],
  accommodationRooms: [],
  getAccommodationRoomStatus: '',
  accommodationById: null,
  accommodationByIdStatus: '',
  accommodationDetail: null,
  isAccommodationDetail: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ACCOMMODATION:
      return { ...state };
    case types.GET_ACCOMMODATION_PENDING:
      return { ...state, loading: true };
    case types.GET_ACCOMMODATION_FULFILLED:
      return {
        ...state,
        listAccomodation: action.payload.data,
        loading: false,
        errors: null,
        isAccomodation: 'success',
      };
    case types.GET_ACCOMMODATION_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
        isAccomodation: 'failed',
      };
    case types.RESET_ACCOMMODATION_PROFILE: {
      return {
        ...state,
        isAccomodation: '',
      };
    }
    case types.SET_CITY_ACCOMMODATION: {
      return {
        ...state,
        cityId: action.payload,
      };
    }

    case types.GET_ACCOMMODATION_RATINGS:
      return { ...state };
    case types.GET_ACCOMMODATION_RATINGS_PENDING:
      return { ...state, loading: true };
    case types.GET_ACCOMMODATION_RATINGS_FULFILLED:
      return {
        ...state,
        accommodationRatings: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_ACCOMMODATION_RATINGS_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };
    case types.GET_ACCOMMODATION_LOCATIONS:
      return { ...state };
    case types.GET_ACCOMMODATION_LOCATIONS_PENDING:
      return { ...state, loading: true };
    case types.GET_ACCOMMODATION_LOCATIONS_FULFILLED:
      return {
        ...state,
        accommodationLocations: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_ACCOMMODATION_LOCATIONS_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };

    case types.GET_ACCOMMODATION_TYPES:
      return { ...state };
    case types.GET_ACCOMMODATION_TYPES_PENDING:
      return { ...state, loading: true };
    case types.GET_ACCOMMODATION_TYPES_FULFILLED:
      return {
        ...state,
        accommodationTypes: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_ACCOMMODATION_TYPES_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };

    case types.GET_ACCOMMODATION_FACILITIES:
      return { ...state };
    case types.GET_ACCOMMODATION_FACILITIES_PENDING:
      return { ...state, loading: true };
    case types.GET_ACCOMMODATION_FACILITIES_FULFILLED:
      return {
        ...state,
        accommodationFacilities: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_ACCOMMODATION_FACILITIES_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };
    //---------------------------------
    // GET_ACCOMMODATION_ROOMS
    //---------------------------------
    case types.GET_ACCOMMODATION_ROOMS:
      return { ...state };
    case types.GET_ACCOMMODATION_ROOMS_PENDING:
      return { ...state, loading: true };
    case types.GET_ACCOMMODATION_ROOMS_FULFILLED:
      return {
        ...state,
        accommodationRooms: action.payload.data,
        errors: {},
        loading: false,
        getAccommodationRoomStatus: 'success',
      };
    case types.GET_ACCOMMODATION_ROOMS_REJECTED:
      return {
        ...state,
        accommodationRooms: [],
        errors: action.payload.response.data,
        loading: false,
        getAccommodationRoomStatus: 'failed',
      };
    //---------------------------------
    // GET_ACCOMMODATION_PROFILE
    //---------------------------------
    case types.GET_ACCOMMODATION_BY_ID:
      return { ...state };
    case types.GET_ACCOMMODATION_BY_ID_PENDING:
      return { ...state, loading: true };
    case types.GET_ACCOMMODATION_BY_ID_FULFILLED:
      return {
        ...state,
        accommodationById: action.payload.data,
        errors: {},
        loading: false,
        accommodationByIdStatus: 'success',
      };
    case types.GET_ACCOMMODATION_BY_ID_REJECTED:
      return {
        ...state,
        accommodationById: null,
        errors: action.payload.response.data,
        loading: false,
        accommodationByIdStatus: 'failed',
      };
    //get  accommodation by service item id
    case types.GET_ACCOMMODATION_BY_SERVICE_ITEM_ID:
      return { ...state };
    case types.GET_ACCOMMODATION_BY_SERVICE_ITEM_ID_PENDING:
      return { ...state, loading: true };
    case types.GET_ACCOMMODATION_BY_SERVICE_ITEM_ID_FULFILLED:
      return {
        ...state,
        accommodationDetail: action.payload.data,
        errors: {},
        loading: false,
        isAccommodationDetail: 'success',
      };
    case types.GET_ACCOMMODATION_BY_SERVICE_ITEM_ID_REJECTED:
      return {
        ...state,
        accommodationDetail: null,
        errors: action.payload.response.data,
        loading: false,
        isAccommodationDetail: 'failed',
      };
    case types.RESET_GET_ACOOMMODATION:
      return {
        ...state,
        loading: false,
        isAccommodationDetail: '',
      };
    default:
      return state;
  }
};

export default reducer;
