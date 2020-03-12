import {
  SET_DRIVING,
  SET_AIRPORT,
  GET_DRIVING,
  GET_AIRPORT,
  GET_LIST_AIRPORT
} from "./actionTypes";
import {
  getDurationApi,
  getAirportApi,
  getAirportListApi
} from "../../api/transportationApi";

export const setDrivingAction = item => {
  return {
    type: SET_DRIVING,
    item
  };
};

export const setAirportAction = airport => {
  return {
    type: SET_AIRPORT,
    airport
  };
};

export const getDrivingAction = airport => {
  return {
    type: GET_DRIVING,
    airport
  };
};

export const getAirportAction = data => {
  return {
    type: GET_AIRPORT,
    payload: getAirportApi(data)
  };
};

//DURATION TRANSPORTATION BY TYPE
// ID TO ID
// ADDRESS TO ID
// ID TO ADDRESS
// ADDRESS TO ADDRESS
export const getDurationAction = (type, data) => {
  return {
    type: GET_DURATION,
    payload: getDurationApi(type, data)
  };
};

export const getListAirportAction = () => {
  return {
    type: GET_LIST_AIRPORT,
    payload: getAirportListApi()
  };
};
