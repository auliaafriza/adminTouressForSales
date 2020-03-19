import * as types from '../actions/accommodation/actionTypes';

const initialState = {
  loading: false,
  listAccomodation: [],
  isAccomodation: null,
  accomodationFilter: [],
  isAccomodationFilter: null,
  cityAccommodation: [],
  accommodationRatings: [],
  accommodationFacilities: [],
  accommodationTypes: [],
  accommodationLocations: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ACCOMMODATION:
      return {...state};
    case types.GET_ACCOMMODATION_PENDING:
      return {...state, loading: true};
    case types.GET_ACCOMMODATION_FULFILLED:
      return {
        ...state,
        listAccomodation: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_ACCOMMODATION_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };
    case types.RESET_ACCOMMODATION_PROFILE: {
      return {
        ...state,
        listAccomodation: [],
        isAccomodation: null,
      };
    }
    case types.SET_CITY_ACCOMMODATION: {
      return {
        ...state,
        cityId: action.payload,
      };
    }

    case types.GET_ACCOMMODATION_RATINGS:
      return {...state};
    case types.GET_ACCOMMODATION_RATINGS_PENDING:
      return {...state, loading: true};
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
      return {...state};
    case types.GET_ACCOMMODATION_LOCATIONS_PENDING:
      return {...state, loading: true};
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
      return {...state};
    case types.GET_ACCOMMODATION_TYPES_PENDING:
      return {...state, loading: true};
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
      return {...state};
    case types.GET_ACCOMMODATION_FACILITIES_PENDING:
      return {...state, loading: true};
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
    default:
      return state;
  }
};

export default reducer;
