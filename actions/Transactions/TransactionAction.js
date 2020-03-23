import {
  GET_PACKAGE_LIST,
  RESET_PACKAGE_LIST_STATUS,
  SET_PACKAGE_STATUS_FROM_HOME_TO_LIST,
  SET_PACKAGE_ID,
  GET_PACKAGE_BY_ID,
  GET_OPERATOR_PROFILE_BY_ID,
  SET_PACKAGE_DATA,
  SET_GUEST_DATA,
  SET_GUEST_TOUR_GUIDE,
  SET_RETURNS_ITINERARY,
  SET_DEPARTURES_ITINERARY,
  // SET_GUEST_QUOTATION,
  RESET_CUSTOM_ITINERARY,
  // SET_SUMMARY_PROGRAM,
  SET_CUSTOM_ITINERARY,
  SET_ARRIVAL_ITINERARY,
  RESET_ARRIVAL_ITINERARY,
  SET_DEPATURE_ITINERARY,
  RESET_DEPATURE_ITINERARY,
  SET_SUMMARY_PROGRAM,
  RESET_SUMMARY_PROGRAM,
  SET_DAILY_PROGRAM,
  RESET_DAILY_PROGRAM,
  SET_GUEST_ITINERARY,
  RESET_GUEST_ITINERARY,
  SET_TOUROPERATOR,
  RESET_TOUROPERATOR,
  SET_GUEST_QUOTATION,
  RESET_GUEST_QUOTATION,
  RESET_RETURNS_ITINERARY,
  RESET_DEPARTURES_ITINERARY,
  POST_CREATE_CUSTOM,
  POST_CREATE_CUSTOM_ON_BE_HALF,
  POST_EDIT_QUOTATION,
  RESET_POST_CREATE_CUSTOM,
  POST_JOIN_TOUR,
  GET_TOUR_SUMMARY_BY_ID,
  RESET_POST_QUOTATION,
  SET_SPECIAL_ADJUSMENT,
  GET_TRANSACTION_HISTORY_BY_STATUS,
  POST_DEMO_JOIN_TOUR,
  POST_DEMO_CREATE_TOUR,
} from './actionTypes';

import {
  getReadyPackageListApi,
  getSeriesPackageListApi,
  getReadyPackageFixedPriceListApi,
  getReadyPackageFixedPriceByIdApi,
  getSeriesPackageByIdApi,
  getReadyPackageByIdApi,
  getTourOperatorProfileByIdApi,
  postCreateCustomOnBeHalfApi,
  postEditQuotationApi,
  postJoinTourApi,
  getTourSummaryByIdApi,
  getTransactionHistoryByStatusApi,
  getDemoJoinTourApi,
  getDemoCreateTourApi,
} from '../../api/transactionApi';

import store from '../../config/store';

export const getReadyPackageListAction = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_LIST,
      payload: getReadyPackageListApi(data, authToken),
    });
  };
};
export const getSeriesPackageListAction = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_LIST,
      payload: getSeriesPackageListApi(data, authToken),
    });
  };
};
export const getReadyPackageFixedPriceListAction = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;
  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_LIST,
      payload: getReadyPackageFixedPriceListApi(data, authToken),
    });
  };
};

export const setPackageIdAction = id => {
  return dispatch => {
    return dispatch({
      type: SET_PACKAGE_ID,
      payload: id,
    });
  };
};

export const setPackageStatusFromHomeToListAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_PACKAGE_STATUS_FROM_HOME_TO_LIST,
      payload: data,
    });
  };
};
export const resetTransactionAction = () => {
  return dispatch => {
    dispatch({ type: RESET_PACKAGE_LIST_STATUS });
  };
};

export const getReadyPackageFixedPriceByIdAction = id => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_BY_ID,
      payload: getReadyPackageFixedPriceByIdApi(id, authToken),
    });
  };
};

export const getSeriesPackageByIdAction = id => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_BY_ID,
      payload: getSeriesPackageByIdApi(id, authToken),
    });
  };
};

export const getReadyPackageByIdAction = id => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_BY_ID,
      payload: getReadyPackageByIdApi(id, authToken),
    });
  };
};

export const getTourOperatorProfileByIdAction = id => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_OPERATOR_PROFILE_BY_ID,
      payload: getTourOperatorProfileByIdApi(id, authToken),
    });
  };
};

export const setPackageDataAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_PACKAGE_DATA,
      payload: data,
    });
  };
};

export const setGuestDataAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_GUEST_DATA,
      payload: data,
    });
  };
};

export const setGuestQuotationAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_GUEST_QUOTATION,
      payload: data,
    });
  };
};

export const setGuestTourGuideAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_GUEST_TOUR_GUIDE,
      payload: data,
    });
  };
};

export const setCustomItineraryAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_CUSTOM_ITINERARY,
      payload: data,
    });
  };
};

export const resetCustomItineraryAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_CUSTOM_ITINERARY,
    });
  };
};

export const setArrivalItineraryAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_ARRIVAL_ITINERARY,
      payload: data,
    });
  };
};

export const resetArrivalItineraryAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_ARRIVAL_ITINERARY,
    });
  };
};

export const setdepartureiteneraryAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_DEPATURE_ITINERARY,
      payload: data,
    });
  };
};

export const resetDepartureItineraryAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_DEPATURE_ITINERARY,
    });
  };
};

//Departures and Returns
export const setDeparturesItineraryAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_DEPARTURES_ITINERARY,
      payload: data,
    });
  };
};

export const resetDeparturesItineraryAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_DEPARTURES_ITINERARY,
    });
  };
};

export const setReturnsItineraryAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_RETURNS_ITINERARY,
      payload: data,
    });
  };
};

export const resetReturnsItineraryAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_RETURNS_ITINERARY,
    });
  };
};
//End----

export const setSummaryProgramAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_SUMMARY_PROGRAM,
      payload: data,
    });
  };
};

export const resetSummaryProgramAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_SUMMARY_PROGRAM,
    });
  };
};

export const setDailyProgramAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_DAILY_PROGRAM,
      payload: data,
    });
  };
};

export const resetDailyProgram = () => {
  return dispatch => {
    return dispatch({
      type: RESET_DAILY_PROGRAM,
    });
  };
};

export const setGuestAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_GUEST_ITINERARY,
      payload: data,
    });
  };
};

export const resetGuestAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_GUEST_ITINERARY,
    });
  };
};

export const setOperatorAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_TOUROPERATOR,
      payload: data,
    });
  };
};

export const resetOperatorAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_TOUROPERATOR,
    });
  };
};

export const setGuestQoutationAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_GUEST_QUOTATION,
      payload: data,
    });
  };
};

export const resetGuestQoutationAction = () => {
  return {
    type: RESET_GUEST_QUOTATION,
  };
};

// export const postCreateCustomAction = data => {
//   return {
//     type: POST_CREATE_CUSTOM,
//     payload: postCreateCustomApi(data),
//   };
// };

export const postCreateCustomOnBeHalfAction = data => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: POST_CREATE_CUSTOM_ON_BE_HALF,
      payload: postCreateCustomOnBeHalfApi(data, authToken),
    });
  };
};

export const postEditQuotationAction = (tourTransactionId, data) => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: POST_EDIT_QUOTATION,
      payload: postEditQuotationApi(tourTransactionId, data, authToken),
    });
  };
};

// export const postEditQuotationAction = (tourTransactionId, data) => {
//   return {
//     type: POST_EDIT_QUOTATION,
//     payload: postEditQuotationApi(tourTransactionId, data),
//   };
// };

export const resetPostCreateCustomAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_POST_CREATE_CUSTOM,
    });
  };
};

// export const postJoinTourAction = (data, type, packageId) => {
//   return {
//     type: POST_JOIN_TOUR,
//     payload: postJoinTourApi(data, type, packageId),
//   };
// };

export const postJoinTourAction = (data, type, packageId) => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: POST_JOIN_TOUR,
      payload: postJoinTourApi(data, type, packageId, authToken),
    });
  };
};

export const getTourSummaryByIdAction = (tourTransactionId, data) => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: GET_TOUR_SUMMARY_BY_ID,
      payload: getTourSummaryByIdApi(tourTransactionId, data, authToken),
    });
  };
};

export const resetPostQuotationAction = () => {
  return dispatch => {
    return dispatch({
      type: RESET_POST_QUOTATION,
    });
  };
};

export const setSpecialAdjusmentAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_SPECIAL_ADJUSMENT,
      payload: data,
    });
  };
};

export const getTransactionHistoryByStatusAction = status => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return {
    type: GET_TRANSACTION_HISTORY_BY_STATUS,
    payload: getTransactionHistoryByStatusApi(status, authToken),
  };
};

export const postDemoJoinTour = (id, item, status) => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: POST_DEMO_JOIN_TOUR,
      payload: getDemoJoinTourApi(id, item, status, authToken),
    });
  };
};

export const postDemoCreateTour = item => {
  const state = store.getState();
  const authToken = state.authReducer.token;

  return dispatch => {
    return dispatch({
      type: POST_DEMO_CREATE_TOUR,
      payload: getDemoCreateTourApi(item, authToken),
    });
  };
};

export const resetStatusPostDemo = () => {
  return dispatch => {
    return dispatch({
      type: RESET_STATUS_POST_DEMO,
    });
  };
};
