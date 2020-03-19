import {
  // LOGIN_START,
  // LOGOUT,
  // FORGOT_PASSWORD,
  // RESET_STATUS_FORGOT,
  // REGISTER,
  // RESET_REGISTER,
  // RESET_STATUS_LOGIN,
  // GET_TOKEN,
  // LOGIN_SUCCESS
  POST_LOGIN,
  RESET_LOGIN_STATUS,
  SET_TOKEN,
} from './actionTypes';
import {postLoginApi} from '../../api/authenticationUrl';

// const login_start = (CompanyCode, Username, Password) => {
//   return {
//     type: LOGIN_START,
//     CompanyCode,
//     Username,
//     Password
//   };
// };

export const postLogin = data => {
  return dispatch => {
    return dispatch ({
      type: POST_LOGIN,
      payload: postLoginApi (data),
    });
  };
};

export const resetLoginStatus = () => {
  return dispatch => {
    dispatch ({type: RESET_LOGIN_STATUS});
  };
};

export const setToken = token => {
  return dispatch => {
    return dispatch ({
      type: SET_TOKEN,
      payload: token,
    });
  };
};

// const logout = () => ({
//   type: LOGOUT
// });

// const forgot_password = email => {
//   return {
//     type: FORGOT_PASSWORD,
//     email
//   };
// };

// const reset_status_forgot = () => ({
//   type: RESET_STATUS_FORGOT
// });

// const post_register = registerData => {
//   return {
//     type: REGISTER,
//     registerData
//   };
// };

// const reset_register = () => {
//   return {
//     type: RESET_REGISTER
//   };
// };

// const reset_status_login = () => {
//   return {
//     type: RESET_STATUS_LOGIN
//   };
// };

// const get_token = token => {
//   return {
//     type: GET_TOKEN,
//     token
//   };
// };

// const login_success = data => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: data
//   };
// };

// export {
//   login_start,
//   logout,
//   forgot_password,
//   reset_status_forgot,
//   post_register,
//   reset_register,
//   reset_status_login,
//   get_token,
//   login_success
// };
