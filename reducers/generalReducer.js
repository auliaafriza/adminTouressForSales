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
  guestData: null,
  countries: [],
  guestTitle: [],
  postSimpleRegisterStatus: '',
  postSimpleRegister: null,
  getTotalCurrencies: null,
  getTotalCurrenciesStatus: '',
  isTourSchedulePDF: '',
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
    case types.SET_GUEST: {
      return {
        ...state,
        guestData: action.payload,
      };
    }
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

    case types.GET_COUNTRIES:
      return { ...state };
    case types.GET_COUNTRIES_PENDING:
      return { ...state, loading: true };
    case types.GET_COUNTRIES_FULFILLED:
      return {
        ...state,
        countries: action.payload.data,
        loading: false,
        errors: null,
      };
    case types.GET_COUNTRIES_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
      };

    case types.GET_GUEST_TITLE_TYPE:
      return { ...state };
    case types.GET_GUEST_TITLE_TYPE_PENDING:
      return { ...state, loading: true };
    case types.GET_GUEST_TITLE_TYPE_FULFILLED:
      return {
        ...state,
        guestTitle: action.payload.data,
        loading: false,
      };
    case types.GET_GUEST_TITLE_TYPE_REJECTED:
      return {
        ...state,
        loading: false,
        errors: { global: action.payload.response.data.error_description },
      };

    case types.GET_IDENTITY_TYPE:
      return { ...state };
    case types.GET_IDENTITY_TYPE_PENDING:
      return { ...state, loading: true };
    case types.GET_IDENTITY_TYPE_FULFILLED:
      return {
        ...state,
        listIdentityType: action.payload.data,
        loading: false,
      };
    case types.GET_IDENTITY_TYPE_REJECTED:
      return {
        ...state,
        loading: false,
        errors: { global: action.payload.response.data.error_description },
      };

    case types.GET_TOTAL_CURRENCIES:
      return { ...state };
    case types.GET_TOTAL_CURRENCIES_PENDING:
      return { ...state, loading: true };
    case types.GET_TOTAL_CURRENCIES_FULFILLED:
      return {
        ...state,
        getTotalCurrenciesStatus: 'success',
        getTotalCurrencies: action.payload.data,
        loading: false,
        errors: {},
      };
    case types.GET_TOTAL_CURRENCIES_REJECTED:
      return {
        ...state,
        getTotalCurrenciesStatus: 'failed',
        loading: false,
        errors: action.payload.response.data,
      };

    case types.POST_SIMPLE_REGISTER:
      return { ...state };
    case types.POST_SIMPLE_REGISTER_PENDING:
      return { ...state, loading: true };
    case types.POST_SIMPLE_REGISTER_FULFILLED:
      return {
        ...state,
        postSimpleRegisterStatus: 'success',
        postSimpleRegister: action.payload.data,
        loading: false,
        errors: {},
      };
    case types.POST_SIMPLE_REGISTER_REJECTED:
      return {
        ...state,
        postSimpleRegisterStatus: 'failed',
        loading: false,
        errors: action.payload.response.data,
      };
    case types.RESET_SIMPLE_REGISTER:
      return {
        ...state,
        postSimpleRegisterStatus: '',
      };

    case types.GET_TOUR_SCHEDULE:
      return { ...state };
    case types.GET_TOUR_SCHEDULE_PENDING:
      return { ...state, loading: true };
    case types.GET_TOUR_SCHEDULE_FULFILLED:
      return {
        ...state,
        isTourSchedulePDF: 'success',
        TourSchedulePDF: action.payload.data,
        loading: false,
        errors: {},
      };
    case types.GET_TOUR_SCHEDULE_REJECTED:
      return {
        ...state,
        isTourSchedulePDF: 'failed',
        TourSchedulePDF: '',
        loading: false,
        errors: action.payload.response.data,
      };
    default:
      return state;
  }
};

export default reducer;
