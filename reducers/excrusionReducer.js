import * as types from '../actions/actionTypes';

const initialState = {
  excursionTypes: [],
  getExcursionTypeStatus: '',
  excursions: [],
  excrusionById: [],
  getExcursionByFilterStatus: '',
  excursion: {},
  getExcursionByIdStatus: '',
  errors: {},
  loading: false,
  loadingExcursionByFilter: false,
  excrusionDetail: null,
  isExcrusionDetailStatus: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //---------------------------------
    // GET_EXCURSION_TYPES
    //---------------------------------
    case types.GET_EXCURSION_TYPES:
      return { ...state };
    case types.GET_EXCURSION_TYPES_PENDING:
      return { ...state, loading: true };
    case types.GET_EXCURSION_TYPES_FULFILLED:
      return {
        ...state,
        excursionTypes: action.payload.data,
        errors: {},
        loading: false,
        getExcursionTypeStatus: 'success',
      };
    case types.GET_EXCURSION_TYPES_REJECTED:
      return {
        ...state,
        excursionTypes: [],
        errors: action.payload.response.data,
        loading: false,
        getExcursionTypeStatus: 'failed',
      };
    //---------------------------------
    // GET_EXCURSION_BY_FILTER
    //---------------------------------
    case types.GET_EXCURSION_BY_FILTER:
      return { ...state };
    case types.GET_EXCURSION_BY_FILTER_PENDING:
      return { ...state, loading: true };
    case types.GET_EXCURSION_BY_FILTER_FULFILLED:
      return {
        ...state,
        excursions: action.payload.data,
        errors: {},
        loading: false,
        getExcursionByFilterStatus: 'success',
      };
    case types.GET_EXCURSION_BY_FILTER_REJECTED:
      return {
        ...state,
        excursions: [],
        errors: action.payload.response.data,
        loading: false,
        getExcursionByFilterStatus: 'failed',
      };
    //---------------------------------
    // GET_EXCURSION_BY_ID
    //---------------------------------
    case types.GET_EXCURSION_BY_ID:
      return { ...state };
    case types.GET_EXCURSION_BY_ID_PENDING:
      return { ...state, loading: true };
    case types.GET_EXCURSION_BY_ID_FULFILLED:
      return {
        ...state,
        excrusionById: action.payload.data,
        errors: {},
        loading: false,
        getExcursionByIdStatus: 'success',
      };
    case types.GET_EXCURSION_BY_ID_REJECTED:
      return {
        ...state,
        excrusionById: {},
        errors: action.payload.response.data,
        loading: false,
        getExcursionByIdStatus: 'failed',
      };
    case types.RESET_STATUS_EXCURSION:
      return {
        ...state,
        getExcursionTypeStatus: '',
        getExcursionByIdStatus: '',
        getExcursionByFilterStatus: '',
      };
    //get detail excrusion
    case types.GET_EXCRUSION_DETAIL:
      return { ...state };
    case types.GET_EXCRUSION_DETAIL_PENDING:
      return { ...state, loading: true };
    case types.GET_EXCRUSION_DETAIL_REJECTED:
      return {
        ...state,
        loading: false,
        excrusionDetail: action.payload.data,
        errors: {},
        isExcrusionDetailStatus: 'success',
      };
    case types.GET_EXCRUSION_DETAIL_FULFILLED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
        excrusionDetail: null,
        isExcrusionDetailStatus: 'failed',
      };
    case type.RESET_GET_EXCRUSION_DETAIL:
      return {
        ...state,
        loading: false,
        isExcrusionDetailStatus: '',
      };
    default:
      return state;
  }
};

export default reducer;
