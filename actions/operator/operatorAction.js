import { GET_TOUR_OPERATOR_LIST } from "./actionTypes";
import { getOperatorListApi } from "../../api/operatorApi";

export const getOperatorListAction = (type, data) => {
  return {
    type: GET_TOUR_OPERATOR_LIST,
    payload: getOperatorListApi(type, data)
  };
};

export const resetOperatorListAction = () => {
  return {
    type: RESET_TOUR_OPERATOR_LIST
  };
};
