import * as types from '../actions/UserAuth/actionTypes';

const initialState = {
  loginStatus: null,
  logout: false,
  logoutStatus: null,
  descriptionLogin: '',
  loading: false,
  expiredToken: '',
  errors: {},
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //---------------------------------
    // POST_LOGIN
    //---------------------------------
    case types.POST_LOGIN:
      return {...state};
    case types.POST_LOGIN_PENDING:
      return {...state, loading: true};
    case types.POST_LOGIN_FULFILLED:
      //   localStorage.setItem("token", action.payload.data.access_token);
      //   localStorage.setItem("expiredToken", action.payload.data.expires);
      // AsyncStorage.setItem("token", action.payload.data.access_token);
      // AsyncStorage.setItem("expiredToken", action.payload.data.expires);
      //   AsyncStorage.setItem('userLogin', JSON.stringify(response.data))
      return {
        ...state,
        descriptionLogin: action.payload.data,
        expiredToken: action.payload.data.expires,
        token: action.payload.data.access_token,
        loading: false,
        loginStatus: true,
      };
    case types.POST_LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        loginStatus: false,
        descriptionLogin: action.payload.response.data.error_description,
      };
    case types.RESET_loginStatus:
      return {...state, loginStatus: false};

    case types.LOGOUT: {
      return {...state, logoutStatus: null, loginStatus: null};
    }
    case types.RESET_LOGOUT_STATUS: {
      return {...state, logoutStatus: null};
    }
    case types.RESET_LOGIN_STATUS: {
      return {
        ...state,
        loginStatus: null,
        descriptionLogin: '',
        expiredToken: '',
      };
    }
    case types.SET_EXPIRED_TOKEN: {
      return {...state, logoutStatus: action.payload};
    }
    case types.SET_TOKEN: {
      return {...state, token: action.payload};
    }

    default:
      return state;
  }
};

export default reducer;
