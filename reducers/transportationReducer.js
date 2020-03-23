import * as types from '../actions/transportation/actionTypes';

const initialState = {
  airport: [],
  driving: [],
  listAirport: [],
  getAirportData: [],
  isTourOperator: null,
  transportationProfileRatings: [],
  getTransportationProfileRatingStatus: '',
  getTransportationProfileCategoryStatus: '',
  transportationProfiles: [],
  getTransportationProfileStatus: '',
  transportationTypes: [],
  getTransportationTypeStatus: '',
  transportationSeatTypes: [],
  getTransportationSeatTypeStatus: '',
  transportationUnitsFilter: [],
  getTransportationUnitsFilterStatus: '',
  transportationUnit: {},
  getTransportationUnitStatus: '',
  errors: {},
  loading: false,
  loadingTransportationUnitsFilter: false,
  getDuration: null,
  getDurationStatus: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AIRPORT:
      return { ...state };
    case types.GET_AIRPORT_PENDING:
      return { ...state, loading: true };
    case types.GET_AIRPORT_FULFILLED:
      return {
        ...state,
        getAirportData: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_AIRPORT_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };
    case types.SET_AIRPORT: {
      return {
        ...state,
        airport: action.airport,
        isAirport: 'success',
      };
    }

    case types.GET_DRIVING:
      return { ...state };
    case types.GET_DRIVING_PENDING:
      return { ...state, loading: true };
    case types.GET_DRIVING_FULFILLED:
      return {
        ...state,
        driving: action.payload.data,
        loading: false,
      };
    case types.GET_DRIVING_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };
    case types.RESET_TRANSPORTATION: {
      return {
        ...state,
        isDriving: true,
        driving: [],
        airport: [],
      };
    }

    case types.GET_LIST_AIRPORT:
      return { ...state };
    case types.GET_LIST_AIRPORT_PENDING:
      return { ...state, loading: true };
    case types.GET_LIST_AIRPORT_FULFILLED:
      return {
        ...state,
        listAirport: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_LIST_AIRPORT_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };
    //---------------------------------
    // GET_TRANSPORTATION_PROFILE_RATINGS
    //---------------------------------
    case types.GET_TRANSPORTATION_PROFILE_RATINGS:
      return { ...state };
    case types.GET_TRANSPORTATION_PROFILE_RATINGS_PENDING:
      return { ...state, loading: true };
    case types.GET_TRANSPORTATION_PROFILE_RATINGS_FULFILLED:
      return {
        ...state,
        transportationProfileRatings: action.payload.data,
        errors: {},
        loading: false,
        getTransportationProfileRatingStatus: 'success',
      };
    case types.GET_TRANSPORTATION_PROFILE_RATINGS_REJECTED:
      return {
        ...state,
        transportationProfileRatings: [],
        errors: action.payload.response.data,
        loading: false,
        getTransportationProfileRatingStatus: 'failed',
      };
    //---------------------------------
    // GET_TRANSPORTATION_PROFILE_CATEGORIES
    //---------------------------------
    case types.GET_TRANSPORTATION_PROFILE_CATEGORIES:
      return { ...state };
    case types.GET_TRANSPORTATION_PROFILE_CATEGORIES_PENDING:
      return { ...state, loading: true };
    case types.GET_TRANSPORTATION_PROFILE_CATEGORIES_FULFILLED:
      return {
        ...state,
        transportationProfileCategories: action.payload.data,
        errors: {},
        loading: false,
        getTransportationProfileCategoryStatus: 'success',
      };
    case types.GET_TRANSPORTATION_PROFILE_CATEGORIES_REJECTED:
      return {
        ...state,
        transportationProfileCategories: [],
        errors: action.payload.response.data,
        loading: false,
        getTransportationProfileCategoryStatus: 'failed',
      };
    //---------------------------------
    // GET_TRANSPORTATION_PROFILES
    //---------------------------------
    case types.GET_TRANSPORTATION_PROFILES:
      return { ...state };
    case types.GET_TRANSPORTATION_PROFILES_PENDING:
      return { ...state, loading: true };
    case types.GET_TRANSPORTATION_PROFILES_FULFILLED:
      return {
        ...state,
        transportationProfiles: action.payload.data,
        errors: {},
        loading: false,
        getTransportationProfileStatus: 'success',
      };
    case types.GET_TRANSPORTATION_PROFILES_REJECTED:
      return {
        ...state,
        transportationProfiles: [],
        errors: action.payload.response.data,
        loading: false,
        getTransportationProfileStatus: 'failed',
      };
    //---------------------------------
    // GET_TRANSPORTATION_TYPES
    //---------------------------------
    case types.GET_TRANSPORTATION_TYPES:
      return { ...state };
    case types.GET_TRANSPORTATION_TYPES_PENDING:
      return { ...state, loading: true };
    case types.GET_TRANSPORTATION_TYPES_FULFILLED:
      return {
        ...state,
        transportationTypes: action.payload.data,
        errors: {},
        loading: false,
        getTransportationTypeStatus: 'success',
      };
    case types.GET_TRANSPORTATION_TYPES_REJECTED:
      return {
        ...state,
        transportationTypes: [],
        errors: action.payload.response.data,
        loading: false,
        getTransportationTypeStatus: 'failed',
      };
    //---------------------------------
    // GET_TRANSPORTATION_SEAT_TYPES
    //---------------------------------
    case types.GET_TRANSPORTATION_SEAT_TYPES:
      return { ...state };
    case types.GET_TRANSPORTATION_SEAT_TYPES_PENDING:
      return { ...state, loading: true };
    case types.GET_TRANSPORTATION_SEAT_TYPES_FULFILLED:
      return {
        ...state,
        transportationSeatTypes: action.payload.data,
        errors: {},
        loading: false,
        getTransportationSeatTypeStatus: 'success',
      };
    case types.GET_TRANSPORTATION_SEAT_TYPES_REJECTED:
      return {
        ...state,
        transportationSeatTypes: [],
        errors: action.payload.response.data,
        loading: false,
        getTransportationSeatTypeStatus: 'failed',
      };
    //---------------------------------
    // GET_TRANSPORTATION_UNITS_FILTER
    //---------------------------------
    case types.GET_TRANSPORTATION_UNITS_FILTER:
      return { ...state };
    case types.GET_TRANSPORTATION_UNITS_FILTER_PENDING:
      return { ...state, loadingTransportationUnitsFilter: true };
    case types.GET_TRANSPORTATION_UNITS_FILTER_FULFILLED:
      return {
        ...state,
        transportationUnitsFilter: action.payload.data,
        errors: {},
        loadingTransportationUnitsFilter: false,
        getTransportationUnitsFilterStatus: 'success',
      };
    case types.GET_TRANSPORTATION_UNITS_FILTER_REJECTED:
      return {
        ...state,
        transportationUnitsFilter: [],
        errors: action.payload.response.data,
        loadingTransportationUnitsFilter: false,
        getTransportationUnitsFilterStatus: 'failed',
      };
    case types.RESET_STATUS_TRANSPORTATION:
      return {
        ...state,
        getTransportationProfileRatingStatus: '',
        getTransportationProfileCategoryStatus: '',
        getTransportationTypeStatus: '',
        getTransportationSeatTypeStatus: '',
      };
    case types.RESET_STATUS_TRANSPORTATION_UNITS_FILTER:
      return {
        ...state,
        getTransportationUnitsFilterStatus: '',
      };

    //get duration
    case types.GET_DURATION:
      return {
        ...state,
      };
    case types.GET_DURATION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.GET_DURATION_FULFILLED:
      return {
        ...state,
        getDuration: action.payload.data,
        errors: {},
        loading: false,
        getDurationStatus: 'success',
      };
    case types.GET_DURATION_REJECTED:
      return {
        ...state,
        getDuration: null,
        errors: action.payload.response.data,
        loading: false,
        getDurationStatus: 'failed',
      };
    default:
      return state;
  }
};

export default reducer;
