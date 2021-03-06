import * as types from '../actions/Transactions/actionTypes';

const initialState = {
  packageList: [],
  packageListStatus: null,
  loading: false,
  packageId: null,
  packageStatusFromHomeToList: '',
  packageById: {},
  packageByIdStatus: null,
  packageIdFromSystem: '',
  tourOperatorId: null,
  tourOperatorIdStatus: null,
  setPackageData: null,
  setGuestData: null,
  setGuestDataStatus: null,
  // DARI MOBILE APPS
  CustomDetails: null,
  Arrival: null,
  ArrivalStatus: '',
  Departure: null,
  DepartureStatus: '',
  SummaryProgram: [],
  SummaryProgramStatus: '',
  DailyProgram: [],
  Guest: [],
  Operator: null,
  GuestQoutation: [],
  Departures: [],
  Returns: [],
  DeparturesStatus: '',
  ReturnsStatus: '',
  isUpdateSpecialAdjusment: null,
  packageByIdSummary: {},
  packageByIdSummaryStatus: null,
  packageHistoryList: [],
  packageHistoryListStatus: '',
  postDemoStatus: '',
  postDemo: null,
  additionalServices: null,
  sendEmailConfirmationStatus: '',
  sendEmailConfirmation: null,
  postSpecialAdjusmentStatus: '',
  postSpecialAdjusmentTour: [],
  dataAdditionalService: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PACKAGE_LIST:
      return { ...state };
    case types.GET_PACKAGE_LIST_PENDING:
      return { ...state, loading: true };
    case types.GET_PACKAGE_LIST_FULFILLED:
      return {
        ...state,
        packageList: action.payload.data,
        packageListStatus: true,
        loading: false,
        errors: null,
      };
    case types.GET_PACKAGE_LIST_REJECTED:
      return {
        ...state,
        packageListStatus: false,
        loading: false,
        errors: action.payload.response.data,
      };
    case types.RESET_PACKAGE_LIST_STATUS:
      return {
        ...state,
        packageListStatus: null,
        packageList: [],
        packageByIdStatus: null,
        packageById: {},
        tourOperatorId: null,
        tourOperatorIdStatus: null,
        setGuestDataStatus: null,
        isUpdateSpecialAdjusment: null,
        packageHistoryList: [],
        packageHistoryListStatus: '',
        postDemoStatus: '',
        postJoinTourStatus: '',
        postSpecialAdjusmentStatus: '',
        postSpecialAdjusmentTour: [],
      };
    case types.SET_PACKAGE_STATUS_FROM_HOME_TO_LIST:
      return {
        ...state,
        packageStatusFromHomeToList: action.payload,
      };
    case types.GET_PACKAGE_BY_ID:
      return { ...state };
    case types.GET_PACKAGE_BY_ID_PENDING:
      return { ...state, loading: true };
    case types.GET_PACKAGE_BY_ID_FULFILLED:
      return {
        ...state,
        packageById: action.payload.data,
        packageByIdStatus: true,
        loading: false,
        errors: null,
      };
    case types.GET_PACKAGE_BY_ID_REJECTED:
      return {
        ...state,
        packageByIdStatus: false,
        loading: false,
        errors: action.payload.response.data,
      };
    case types.SET_PACKAGE_ID:
      return {
        ...state,
        packageIdFromSystem: action.payload,
      };

    case types.GET_OPERATOR_PROFILE_BY_ID:
      return { ...state };
    case types.GET_OPERATOR_PROFILE_BY_ID_PENDING:
      return { ...state, loading: true };
    case types.GET_OPERATOR_PROFILE_BY_ID_FULFILLED:
      return {
        ...state,
        tourOperatorId: action.payload.data,
        tourOperatorIdStatus: true,
        loading: false,
        errors: null,
      };
    case types.GET_OPERATOR_PROFILE_BY_ID_REJECTED:
      return {
        ...state,
        tourOperatorIdStatus: false,
        loading: false,
        errors: action.payload.response.data,
      };
    case types.SET_PACKAGE_DATA:
      return {
        ...state,
        setPackageData: action.payload,
      };
    case types.SET_GUEST_DATA:
      return {
        ...state,
        setGuestData: action.payload,
        setGuestDataStatus: true,
      };

    case types.SET_GUEST_TOUR_GUIDE:
      return {
        ...state,
        setGuestTourGuide: action.payload,
      };

    // case types.SET_RETURNS_ITINERARY:
    //   return {
    //     ...state,
    //     setReturnItinerary: action.payload
    //   };

    // case types.SET_DEPARTURES_ITINERARY:
    //   return {
    //     ...state,
    //     setDepartureItinerary: action.payload
    //   };

    case types.SET_GUEST_QUOTATION:
      return {
        ...state,
        setGuestQuotation: action.payload,
      };

    // case types.SET_CUSTOM_ITINERARY:
    //   return {
    //     ...state,
    //     setCustomItInerary: action.payload
    //   };
    // case types.RESET_CUSTOM_ITINERARY:
    //   return {
    //     ...state,
    //     setCustomItInerary: {}
    //   };

    // case types.SET_SUMMARY_PROGRAM:
    //   return {
    //     ...state,
    //     setSumaaryProgram: action.payload
    //   };

    //===============================================================================
    // --------------------------------------------------------------------------------------------
    // Custom Itenenrary Option
    // --------------------------------------------------------------------------------------------
    case types.SET_CUSTOM_ITINERARY: {
      return {
        ...state,
        CustomDetails: action.payload,
      };
    }
    case types.RESET_CUSTOM_ITINERARY: {
      return {
        ...state,
        CustomDetails: null,
        Arrival: null,
        Departure: null,
        SummaryProgram: [],
        DailyProgram: [],
      };
    }
    // --------------------------------------------------------------------------------------------
    // Departures and Returns
    // --------------------------------------------------------------------------------------------
    case types.SET_DEPARTURES_ITINERARY: {
      return {
        ...state,
        Departures: action.payload,
        DeparturesStatus: 'success',
      };
    }
    case types.RESET_DEPARTURES_ITINERARY: {
      return {
        ...state,
        DeparturesStatus: '',
      };
    }

    case types.SET_RETURNS_ITINERARY: {
      return {
        ...state,
        Returns: action.payload,
        ReturnsStatus: 'success',
      };
    }
    case types.RESET_RETURNS_ITINERARY: {
      return {
        ...state,
        ReturnsStatus: '',
      };
    }
    // --------------------------------------------------------------------------------------------
    // Airport Arrival
    // --------------------------------------------------------------------------------------------
    case types.ARRIVAL_ITINERARY: {
      return {
        ...state,
        Arrival: action.payload,
        ArrivalStatus: 'success',
      };
    }
    case types.RESET_ARRIVAL_ITINERARY: {
      return {
        ...state,
        ArrivalStatus: '',
      };
    }

    // --------------------------------------------------------------------------------------------
    // Airport Departure
    // --------------------------------------------------------------------------------------------
    case types.DEPATURE_ITINERARY: {
      return {
        ...state,
        Departure: action.payload,
        DepartureStatus: 'success',
      };
    }
    case types.RESET_DEPATURE_ITINERARY: {
      return {
        ...state,
        DepartureStatus: '',
      };
    }

    // --------------------------------------------------------------------------------------------
    // Summary Program
    // --------------------------------------------------------------------------------------------
    case types.SET_SUMMARY_PROGRAM: {
      return {
        ...state,
        SummaryProgram: action.payload,
        SummaryProgramStatus: 'success',
      };
    }
    case types.RESET_SUMMARY_PROGRAM: {
      return {
        ...state,
        SummaryProgramStatus: '',
      };
    }

    // --------------------------------------------------------------------------------------------
    // Daily Program
    // --------------------------------------------------------------------------------------------
    case types.SET_DAILY_PROGRAM: {
      return {
        ...state,
        DailyProgram: action.payload,
      };
    }
    case types.RESET_DAILY_PROGRAM: {
      return {
        ...state,
        DailyProgram: [],
      };
    }

    case types.SET_GUEST_ITINERARY: {
      return {
        ...state,
        Guest: action.payload,
      };
    }

    case types.RESET_GUEST_ITINERARY: {
      return {
        ...state,
        Guest: [],
      };
    }

    // case types.SET_TOUROPERATOR: {
    //   return {
    //     ...state,
    //     Operator: action.payload,
    //   };
    // }

    case types.SET_OPERATOR: {
      return {
        ...state,
        Operator: action.payload,
      };
    }

    case types.RESET_TOUROPERATOR: {
      return {
        ...state,
        Operator: null,
      };
    }

    case types.SET_GUEST_QUOTATION:
      return {
        ...state,
        GuestQoutation: action.payload,
      };
    case types.RESET_GUEST_QUOTATION:
      return {
        ...state,
        GuestQoutation: [],
      };

    case types.SET_SPECIAL_ADJUSMENT:
      return {
        ...state,
        setSpecialAdjusment: action.payload,
        isUpdateSpecialAdjusment: true,
      };

    case types.POST_CREATE_CUSTOM_ON_BE_HALF:
      return { ...state };
    case types.POST_CREATE_CUSTOM_ON_BE_HALF_PENDING:
      return { ...state, loading: true };
    case types.POST_CREATE_CUSTOM_ON_BE_HALF_FULFILLED:
      return {
        ...state,
        postCreateCustomOnBeHalf: action.payload.data,
        postCreateCustomOnBeHalfStatus: true,
        loading: false,
        errors: null,
      };
    case types.POST_CREATE_CUSTOM_ON_BE_HALF_REJECTED:
      return {
        ...state,
        postCreateCustomOnBeHalfStatus: false,
        loading: false,
        errors: action.payload.response.data,
      };

    case types.POST_EDIT_QUOTATION:
      return { ...state };
    case types.POST_EDIT_QUOTATION_PENDING:
      return { ...state, loading: true };
    case types.POST_EDIT_QUOTATION_FULFILLED:
      return {
        ...state,
        postEditQuotation: action.payload.data,
        postEditQuotationStatus: true,
        loading: false,
        errors: null,
      };
    case types.POST_EDIT_QUOTATION_REJECTED:
      return {
        ...state,
        postEditQuotationStatus: false,
        loading: false,
        errors: action.payload.response.data,
      };

    case types.GET_TOUR_SUMMARY_BY_ID:
      return { ...state };
    case types.GET_TOUR_SUMMARY_BY_ID_PENDING:
      return { ...state, loading: true };
    case types.GET_TOUR_SUMMARY_BY_ID_FULFILLED:
      return {
        ...state,
        packageByIdSummary: action.payload.data,
        packageByIdSummaryStatus: 'success',
        loading: false,
        errors: null,
      };
    case types.GET_TOUR_SUMMARY_BY_ID_REJECTED:
      return {
        ...state,
        packageByIdSummaryStatus: 'failed',
        loading: false,
        errors: action.payload.response.data,
      };
    case types.RESET_GET_TOUR_SUMMARY_BY_ID: {
      return { ...state, packageByIdSummaryStatus: '' };
    }

    case types.GET_TRANSACTION_HISTORY_BY_STATUS:
      return { ...state };
    case types.GET_TRANSACTION_HISTORY_BY_STATUS_PENDING:
      return { ...state, loading: true };
    case types.GET_TRANSACTION_HISTORY_BY_STATUS_FULFILLED:
      return {
        ...state,
        packageHistoryList: action.payload.data,
        packageHistoryListStatus: 'success',
        loading: false,
        errors: null,
      };
    case types.GET_TRANSACTION_HISTORY_BY_STATUS_REJECTED:
      return {
        ...state,
        packageHistoryListStatus: 'failed',
        loading: false,
        errors: action.payload.response.data,
      };

    //post demo dan join tour
    case types.POST_DEMO_JOIN_TOUR:
      return {
        ...state,
      };
    case types.POST_DEMO_JOIN_TOUR_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.POST_DEMO_JOIN_TOUR_FULFILLED:
      return {
        ...state,
        postDemoStatus: 'success',
        postDemo: action.payload.data,
        loading: false,
        errors: {},
      };
    case types.POST_DEMO_JOIN_TOUR_REJECTED:
      return {
        ...state,
        postDemoStatus: 'failed',
        loading: false,
        errors: action.payload.response.data,
      };
    case types.POST_DEMO_CREATE_TOUR:
      return {
        ...state,
      };
    case types.POST_DEMO_CREATE_TOUR_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.POST_DEMO_CREATE_TOUR_FULFILLED:
      return {
        ...state,
        postDemoStatus: 'success',
        postDemo: action.payload.data,
        loading: false,
        errors: {},
      };
    case types.POST_DEMO_CREATE_TOUR_REJECTED:
      return {
        ...state,
        postDemoStatus: 'failed',
        loading: false,
        errors: action.payload.response.data,
      };
    case types.RESET_STATUS_POST_DEMO: {
      return {
        ...state,
        postDemoStatus: '',
      };
    }

    case types.POST_JOIN_TOUR:
      return {
        ...state,
      };
    case types.POST_JOIN_TOUR_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.POST_JOIN_TOUR_FULFILLED:
      return {
        ...state,
        postJoinTourStatus: 'success',
        postJoinTour: action.payload.data,
        loading: false,
        errors: {},
      };
    case types.POST_JOIN_TOUR_REJECTED:
      return {
        ...state,
        postJoinTourStatus: 'failed',
        loading: false,
        errors: action.payload.response.data,
      };
    //set data additional services
    case types.SET_ADDITIONAL_SERVICES:
      return {
        ...state,
        additionalServices: action.payload,
      };
    //send email
    case types.SEND_EMAIL_CONFIRMATION:
      return {
        ...state,
      };
    case types.SEND_EMAIL_CONFIRMATION_PENDING:
      return {
        ...state,
        loading: true,
      };

    case types.SEND_EMAIL_CONFIRMATION_FULFILLED:
      return {
        ...state,
        sendEmailConfirmation: action.payload.data,
        errors: {},
        loading: false,
        sendEmailConfirmationStatus: 'success',
      };
    case types.SEND_EMAIL_CONFIRMATION_REJECTED:
      return {
        ...state,
        sendEmailConfirmation: null,
        errors: action.payload.response.data,
        loading: false,
        sendEmailConfirmationStatus: 'failed',
      };
    case types.RESET_SEND_EMAIL:
      return {
        ...state,
        sendEmailConfirmationStatus: '',
      };

    case types.POST_SPECIAL_ADJUSMENT:
      return {
        ...state,
      };
    case types.POST_SPECIAL_ADJUSMENT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.POST_SPECIAL_ADJUSMENT_FULFILLED:
      return {
        ...state,
        postSpecialAdjusmentStatus: 'success',
        postSpecialAdjusmentTour: action.payload.data,
        loading: false,
        errors: {},
      };
    case types.POST_SPECIAL_ADJUSMENT_REJECTED:
      return {
        ...state,
        postSpecialAdjusmentStatus: 'failed',
        loading: false,
        errors: action.payload.response.data,
      };
    // additional service set data
    case types.SET_ADDITIONAL_SERVICE: {
      return {
        ...state,
        dataAdditionalService: action.data,
      };
    }
    case types.RESET_ADDITIONAL_SERVICE: {
      return {
        ...state,
        dataAdditionalService: null,
      };
    }
    default:
      return state;
  }
};

export default reducer;
