import * as types from "../actions/General/actionTypes";

const initialState = {
  tourTypeList: [],
  tourCategoryList: [],
  allMovementTypes: [],
  loading: false
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
        errors: null
      };
    case types.GET_TOUR_CATEGORY_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data
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
        errors: null
      };
    case types.GET_TOUR_TYPE_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data
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
        errors: null
      };
    case types.GET_ALL_MOVEMENT_TYPES_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
        isMovementMode: false
      };

    default:
      return state;
  }
};

export default reducer;
