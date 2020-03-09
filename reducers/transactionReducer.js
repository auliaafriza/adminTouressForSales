import * as types from "../actions/Transactions/actionTypes";

const initialState = {
  packageList: [],
  packageListStatus: null,
  loading: false,
  packageId: null,
  packageStatusFromHomeToList: "",
  packageById: {},
  packageByIdStatus: null,
  packageIdFromSystem: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PACKAGE_LIST:
      return { ...state };
    case types.GET_PACKAGE_LIST_PENDING:
      return { ...state, loading: true };
    case types.GET_PACKAGE_LIST_FULFILLED:
      return {
        ...state,
        packageList: action.payload.data,
        packageListStatus: true,
        loading: false,
        errors: null
      };
    case types.GET_PACKAGE_LIST_REJECTED:
      return {
        ...state,
        packageListStatus: false,
        loading: false,
        errors: action.payload.response.data
      };
    case types.RESET_PACKAGE_LIST_STATUS:
      return {
        ...state,
        packageListStatus: null,
        packageList: [],
        packageByIdStatus: null,
        packageById: {}
      };
    case types.SET_PACKAGE_STATUS_FROM_HOME_TO_LIST:
      return {
        ...state,
        packageStatusFromHomeToList: action.payload
      };
    case types.GET_PACKAGE_BY_ID:
      return { ...state };
    case types.GET_PACKAGE_BY_ID_PENDING:
      return { ...state, loading: true };
    case types.GET_PACKAGE_BY_ID_FULFILLED:
      return {
        ...state,
        packageById: action.payload.data,
        packageByIdStatus: true,
        loading: false,
        errors: null
      };
    case types.GET_PACKAGE_BY_ID_REJECTED:
      return {
        ...state,
        packageByIdStatus: false,
        loading: false,
        errors: action.payload.response.data
      };
    case types.SET_PACKAGE_ID:
      return {
        ...state,
        packageIdFromSystem: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
