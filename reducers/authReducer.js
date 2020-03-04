import * as types from "../actions/UserAuth/actionTypes";

const initialState = {
  logging_in: false,
  login_status: null,
  logging_out: false,
  logout_status: "",
  descriptionLogin: {},
  loading: false,
  isLogIn: false,
  expiredToken: "",
  errors: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //---------------------------------
    // POST_LOGIN
    //---------------------------------
    case types.POST_LOGIN:
      return { ...state };
    case types.POST_LOGIN_PENDING:
      return { ...state, loading: true };
    case types.POST_LOGIN_FULFILLED:
      //   localStorage.setItem("token", action.payload.data.access_token);
      //   localStorage.setItem("expiredToken", action.payload.data.expires);
      AsyncStorage.setItem(
        "userLogin",
        JSON.stringify(action.payload.data.access_token)
      );
      //   AsyncStorage.setItem('userLogin', JSON.stringify(response.data))
      return {
        ...state,
        descriptionLogin: action.payload.data,
        loading: false,
        isLogIn: true,
        login_status: true,
        expiredToken: action.payload.data.expires
      };
    case types.POST_LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        isLogIn: false,
        login_status: false,
        descriptionLogin: action.payload.response.data
      };
    case types.RESET_LOGIN_STATUS:
      return { ...state, login_status: false };

    case types.LOGOUT: {
      return { ...state, logout_status: "success", isLogIn: false };
    }
    case types.RESET_LOGOUT_STATUS: {
      return { ...state, logout_status: "" };
    }
    case types.SET_EXPIRED_TOKEN: {
      return { ...state, expiredToken: action.payload };
    }

    default:
      return state;
  }
};

export default reducer;
