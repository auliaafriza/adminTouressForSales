import {
  getTourCategoryApi,
  getTourTypeApi,
  getAllMovementTypesApi
} from "../../api/generalApi";
import {
  GET_TOUR_TYPE,
  GET_TOUR_CATEGORY,
  GET_ALL_MOVEMENT_TYPES
} from "./actionTypes";

export const getTourTypeAction = () => {
  return dispatch => {
    return dispatch({
      type: GET_TOUR_TYPE,
      payload: getTourTypeApi()
    });
  };
};
export const getTourCategoryAction = () => {
  return dispatch => {
    return dispatch({
      type: GET_TOUR_CATEGORY,
      payload: getTourCategoryApi()
    });
  };
};

export const getAllMovementTypesAction = () => {
  return dispatch => {
    return dispatch({
      type: GET_ALL_MOVEMENT_TYPES,
      payload: getAllMovementTypesApi()
    });
  };
};
