import * as types from '../actions/operator/actionTypes';

const initialState = {
  operatorList: [],
  isTourOperator: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOUR_OPERATOR_LIST:
      return { ...state };
    case types.GET_TOUR_OPERATOR_LIST_PENDING:
      return { ...state, loading: true };
    case types.GET_TOUR_OPERATOR_LIST_FULFILLED:
      return {
        ...state,
        operatorList: action.payload.data,
        loading: false,
        errors: null,
        isTourOperator: true,
      };
    case types.GET_TOUR_OPERATOR_LIST_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data,
        isTourOperator: false,
      };
    case types.RESET_TOUR_OPERATOR_LIST: {
      return {
        ...state,
        isTourOperator: null,
      };
    }

    case types.SET_OPERATOR: {
      return {
        ...state,
        Operator: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
