import * as types from '../actions/restaurant/actionTypes';

const initialState = {
  restaurants: [],
  getRestaurantByFilterStatus: '',
  restaurantRatings: [],
  getRestaurantRatingStatus: '',
  restaurantSpecializations: [],
  getRestaurantSpecializationsStatus: '',
  restaurantMenuClasses: [],
  getRestaurantMenuClassesStatus: '',
  restaurantMenusById: [],
  getRestaurantMenusByIdStatus: '',
  menu: {},
  getMenuByIdStatus: '',
  restaurantProfileByServiceItem: {},
  getRestaurantProfileByServiceItemStatus: '',
  errors: {},
  loading: false,
  loadingRestaurantByFilter: false,
  loadingRestaurantMenuById: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //---------------------------------
    // GET_RESTAURANT_BY_FILTER
    //---------------------------------
    case types.GET_RESTAURANT_BY_FILTER:
      return { ...state };
    case types.GET_RESTAURANT_BY_FILTER_PENDING:
      return { ...state, loadingRestaurantByFilter: true };
    case types.GET_RESTAURANT_BY_FILTER_FULFILLED:
      return {
        ...state,
        restaurants: action.payload.data,
        errors: {},
        loadingRestaurantByFilter: false,
        getRestaurantByFilterStatus: 'success',
      };
    case types.GET_RESTAURANT_BY_FILTER_REJECTED:
      return {
        ...state,
        restaurants: [],
        errors: action.payload.response.data,
        loadingRestaurantByFilter: false,
        getRestaurantByFilterStatus: 'failed',
      };
    //---------------------------------
    // GET_RESTAURANT_RATING
    //---------------------------------
    case types.GET_RESTAURANT_RATING:
      return { ...state };
    case types.GET_RESTAURANT_RATING_PENDING:
      return { ...state, loading: true };
    case types.GET_RESTAURANT_RATING_FULFILLED:
      return {
        ...state,
        restaurantRatings: action.payload.data,
        errors: {},
        loading: false,
        getRestaurantRatingStatus: 'success',
      };
    case types.GET_RESTAURANT_RATING_REJECTED:
      return {
        ...state,
        restaurantRatings: [],
        errors: action.payload.response.data,
        loading: false,
        getRestaurantRatingStatus: 'failed',
      };
    //---------------------------------
    // GET_RESTAURANT_SPECIALIZATIONS
    //---------------------------------
    case types.GET_RESTAURANT_SPECIALIZATIONS:
      return { ...state };
    case types.GET_RESTAURANT_SPECIALIZATIONS_PENDING:
      return { ...state, loading: true };
    case types.GET_RESTAURANT_SPECIALIZATIONS_FULFILLED:
      return {
        ...state,
        restaurantSpecializations: action.payload.data,
        errors: {},
        loading: false,
        getRestaurantSpecializationsStatus: 'success',
      };
    case types.GET_RESTAURANT_SPECIALIZATIONS_REJECTED:
      return {
        ...state,
        restaurantSpecializations: [],
        errors: action.payload.response.data,
        loading: false,
        getRestaurantSpecializationsStatus: 'failed',
      };
    //---------------------------------
    // GET_RESTAURANT_MENU_CLASSES
    //---------------------------------
    case types.GET_RESTAURANT_MENU_CLASSES:
      return { ...state };
    case types.GET_RESTAURANT_MENU_CLASSES_PENDING:
      return { ...state, loading: true };
    case types.GET_RESTAURANT_MENU_CLASSES_FULFILLED:
      return {
        ...state,
        restaurantMenuClasses: action.payload.data,
        errors: {},
        loading: false,
        getRestaurantMenuClassesStatus: 'success',
      };
    case types.GET_RESTAURANT_MENU_CLASSES_REJECTED:
      return {
        ...state,
        restaurantMenuClasses: [],
        errors: action.payload.response.data,
        loading: false,
        getRestaurantMenuClassesStatus: 'failed',
      };
    //---------------------------------
    // GET_RESTAURANT_MENU_BY_ID
    //---------------------------------
    case types.GET_RESTAURANT_MENU_BY_ID:
      return { ...state };
    case types.GET_RESTAURANT_MENU_BY_ID_PENDING:
      return { ...state, loadingRestaurantMenuById: true };
    case types.GET_RESTAURANT_MENU_BY_ID_FULFILLED:
      return {
        ...state,
        restaurantMenusById: action.payload.data,
        errors: {},
        loadingRestaurantMenuById: false,
        getRestaurantMenusByIdStatus: 'success',
      };
    case types.GET_RESTAURANT_MENU_BY_ID_REJECTED:
      return {
        ...state,
        restaurantMenusById: [],
        errors: action.payload.response.data,
        loadingRestaurantMenuById: false,
        getRestaurantMenusByIdStatus: 'failed',
      };
    //---------------------------------
    // GET_MENU_BY_ID
    //---------------------------------
    case types.GET_MENU_BY_ID:
      return { ...state };
    case types.GET_MENU_BY_ID_PENDING:
      return { ...state, loading: true };
    case types.GET_MENU_BY_ID_FULFILLED:
      return {
        ...state,
        menu: action.payload.data,
        errors: {},
        loading: false,
        getMenuByIdStatus: 'success',
      };
    case types.GET_MENU_BY_ID_REJECTED:
      return {
        ...state,
        menu: {},
        errors: action.payload.response.data,
        loading: false,
        getMenuByIdStatus: 'failed',
      };
    //---------------------------------
    // GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM
    //---------------------------------
    case types.GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM:
      return { ...state };
    case types.GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM_PENDING:
      return { ...state, loading: true };
    case types.GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM_FULFILLED:
      return {
        ...state,
        restaurantProfileByServiceItem: action.payload.data,
        errors: {},
        loading: false,
        getRestaurantProfileByServiceItemStatus: 'success',
      };
    case types.GET_RESTAURANT_PROFILE_BY_SERVICE_ITEM_REJECTED:
      return {
        ...state,
        restaurantProfileByServiceItem: {},
        errors: action.payload.response.data,
        loading: false,
        getRestaurantProfileByServiceItemStatus: 'failed',
      };
    case types.RESET_STATUS_RESTAURANT:
      return {
        ...state,
        getRestaurantRatingStatus: '',
        getRestaurantSpecializationsStatus: '',
        getRestaurantMenuClassesStatus: '',
        getRestaurantMenusByIdStatus: '',
        getMenuByIdStatus: '',
        getRestaurantProfileByServiceItemStatus: '',
      };
    case types.RESET_STATUS_RESTAURANTS_BY_FILTER:
      return {
        ...state,
        getRestaurantByFilterStatus: '',
      };
    default:
      return state;
  }
};

export default reducer;
