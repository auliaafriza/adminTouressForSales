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
  RESET_DEPARTURES_ITINERARY
} from "./actionTypes";
import {
  getReadyPackageListApi,
  getSeriesPackageListApi,
  getReadyPackageFixedPriceListApi,
  getReadyPackageFixedPriceByIdApi,
  getSeriesPackageByIdApi,
  getReadyPackageByIdApi,
  getTourOperatorProfileByIdApi
} from "../../api/transactionApi";

export const getReadyPackageListAction = data => {
  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_LIST,
      payload: getReadyPackageListApi(data)
    });
  };
};
export const getSeriesPackageListAction = data => {
  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_LIST,
      payload: getSeriesPackageListApi(data)
    });
  };
};
export const getReadyPackageFixedPriceListAction = data => {
  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_LIST,
      payload: getReadyPackageFixedPriceListApi(data)
    });
  };
};

export const setPackageIdAction = id => {
  return dispatch => {
    return dispatch({
      type: SET_PACKAGE_ID,
      payload: id
    });
  };
};

export const setPackageStatusFromHomeToListAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_PACKAGE_STATUS_FROM_HOME_TO_LIST,
      payload: data
    });
  };
};
export const resetTransactionAction = () => {
  return dispatch => {
    dispatch({ type: RESET_PACKAGE_LIST_STATUS });
  };
};

export const getReadyPackageFixedPriceByIdAction = id => {
  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_BY_ID,
      payload: getReadyPackageFixedPriceByIdApi(id)
    });
  };
};

export const getSeriesPackageByIdAction = id => {
  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_BY_ID,
      payload: getSeriesPackageByIdApi(id)
    });
  };
};

export const getReadyPackageByIdAction = id => {
  return dispatch => {
    return dispatch({
      type: GET_PACKAGE_BY_ID,
      payload: getReadyPackageByIdApi(id)
    });
  };
};

export const getTourOperatorProfileByIdAction = id => {
  return dispatch => {
    return dispatch({
      type: GET_OPERATOR_PROFILE_BY_ID,
      payload: getTourOperatorProfileByIdApi(id)
    });
  };
};

export const setPackageDataAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_PACKAGE_DATA,
      payload: data
    });
  };
};

export const setGuestDataAction = data => {
  return dispatch => {
    return dispatch({
      type: SET_GUEST_DATA,
      payload: data
    });
  };
};

export const setGuestQuotationAction = data => {
  return {
    type: SET_GUEST_QUOTATION,
    payload: data
  };
};

export const setGuestTourGuideAction = data => {
  return {
    type: SET_GUEST_TOUR_GUIDE,
    payload: data
  };
};

export const setCustomItineraryAction = data => {
  return {
    type: SET_CUSTOM_ITINERARY,
    payload: data
  };
};

export const resetCustomItineraryAction = () => {
  return {
    type: RESET_CUSTOM_ITINERARY
  };
};

export const setArrivalItineraryAction = data => {
  return {
    type: SET_ARRIVAL_ITINERARY,
    payload: data
  };
};

export const resetArrivalItineraryAction = () => {
  return {
    type: RESET_ARRIVAL_ITINERARY
  };
};

export const setdepartureiteneraryAction = data => {
  return {
    type: SET_DEPATURE_ITINERARY,
    payload: data
  };
};

export const resetDepartureItineraryAction = () => {
  return {
    type: RESET_DEPATURE_ITINERARY
  };
};

//Departures and Returns
export const setDeparturesItineraryAction = data => {
  return {
    type: SET_DEPARTURES_ITINERARY,
    payload: data
  };
};

export const resetDeparturesItineraryAction = () => {
  return {
    type: RESET_DEPARTURES_ITINERARY
  };
};

export const setReturnsItineraryAction = data => {
  return {
    type: SET_RETURNS_ITINERARY,
    payload: data
  };
};

export const resetReturnsItineraryAction = () => {
  return {
    type: RESET_RETURNS_ITINERARY
  };
};
//End----

export const setSummaryProgramAction = data => {
  return {
    type: SET_SUMMARY_PROGRAM,
    payload: data
  };
};

export const resetSummaryProgramAction = () => {
  return {
    type: RESET_SUMMARY_PROGRAM
  };
};

export const setDailyProgramAction = data => {
  return {
    type: SET_DAILY_PROGRAM,
    payload: data
  };
};

export const resetDailyProgram = () => {
  return {
    type: RESET_DAILY_PROGRAM
  };
};

export const setGuestAction = data => {
  return {
    type: SET_GUEST_ITINERARY,
    payload: data
  };
};

export const resetGuestAction = () => {
  return {
    type: RESET_GUEST_ITINERARY
  };
};

export const setOperatorAction = data => {
  return {
    type: SET_TOUROPERATOR,
    payload: data
  };
};

export const resetOperatorAction = () => {
  return {
    type: RESET_TOUROPERATOR
  };
};

export const setGuestQoutationAction = data => {
  return {
    type: SET_GUEST_QUOTATION,
    payload: data
  };
};

export const resetGuestQoutationAction = () => {
  return {
    type: RESET_GUEST_QUOTATION
  };
};
