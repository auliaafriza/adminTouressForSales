import * as types from '../actions/transportation/actionTypes';

const initialState = {
  airport: [],
  driving: [],
  listAirport: [],
  getAirportData: [],
  isTourOperator: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AIRPORT:
      return {...state};
    case types.GET_AIRPORT_PENDING:
      return {...state, loading: true};
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
      return {...state};
    case types.GET_DRIVING_PENDING:
      return {...state, loading: true};
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
      return {...state};
    case types.GET_LIST_AIRPORT_PENDING:
      return {...state, loading: true};
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

    default:
      return state;
  }
};

export default reducer;
