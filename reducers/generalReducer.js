import * as types from '../actions/General/actionTypes';

const initialState = {
  tourTypeList: [],
  tourCategoryList: [],
  allMovementTypes: [],
  cityInCountry: [],
  loading: false,
  ListCompany: [],
  isListCompany: '',
  dataUserIdCompany: [],
  isDataUserIdCompany: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOUR_CATEGORY:
      return { ...state };
    case types.GET_TOUR_CATEGORY_PENDING:
      return { ...state, loading: true };
    case types.GET_TOUR_CATEGORY_FULFILLED:
      return {
        ...state,
        tourTypeList: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_TOUR_CATEGORY_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };

    case types.GET_TOUR_TYPE:
      return { ...state };
    case types.GET_TOUR_TYPE_PENDING:
      return { ...state, loading: true };
    case types.GET_TOUR_TYPE_FULFILLED:
      return {
        ...state,
        tourCategoryList: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_TOUR_TYPE_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };

    case types.GET_ALL_MOVEMENT_TYPES:
      return { ...state };
    case types.GET_ALL_MOVEMENT_TYPES_PENDING:
      return { ...state, loading: true };
    case types.GET_ALL_MOVEMENT_TYPES_FULFILLED:
      return {
        ...state,
        isMovementMode: true,
        allMovementTypes: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_ALL_MOVEMENT_TYPES_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
        isMovementMode: false,
      };

    case types.GET_CITY_IN_COUNTRY:
      return { ...state };
    case types.GET_CITY_IN_COUNTRY_PENDING:
      return { ...state, loading: true };
    case types.GET_CITY_IN_COUNTRY_FULFILLED:
      return {
        ...state,

        cityInCountry: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_CITY_IN_COUNTRY_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };

    case types.GET_CUSTOMER_LIST:
      return { ...state };
    case types.GET_CUSTOMER_LIST_PENDING:
      return { ...state, loading: true };
    case types.GET_CUSTOMER_LIST_FULFILLED:
      return {
        ...state,
        ListCompany: action.payload.data,
        isListCompany: 'success',
        loading: false,
        errors: null,
      };
    case types.GET_CUSTOMER_LIST_REJECTED:
      return {
        ...state,
        loading: false,
        isListCompany: 'failed',
        errors: action.payload.response.data,
      };

    case types.GET_USER_ID_COMPANY:
      return { ...state };
    case types.GET_USER_ID_COMPANY_PENDING:
      return { ...state, loading: true };
    case types.GET_USER_ID_COMPANY_FULFILLED:
      return {
        ...state,
        dataUserIdCompany: action.payload.data,
        isDataUserIdCompany: 'success',
        loading: false,
        errors: null,
      };
    case types.GET_USER_ID_COMPANY_REJECTED:
      return {
        ...state,
        loading: false,
        isDataUserIdCompany: 'failed',
        errors: action.payload.response.data,
      };

    case types.RESET_CUSTOMER_LIST:
      return {
        ...state,
        isListCompany: '',
        isDataUserIdCompany: '',
      };

    default:
      return state;
  }
};

export default reducer;
