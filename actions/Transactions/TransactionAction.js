import {
  GET_PACKAGE_LIST,
  RESET_PACKAGE_LIST_STATUS,
  SET_PACKAGE_STATUS_FROM_HOME_TO_LIST,
  SET_PACKAGE_ID,
  GET_PACKAGE_BY_ID
} from "./actionTypes";
import {
  getReadyPackageListApi,
  getSeriesPackageListApi,
  getReadyPackageFixedPriceListApi,
  getReadyPackageFixedPriceByIdApi,
  getSeriesPackageByIdApi,
  getReadyPackageByIdApi
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
