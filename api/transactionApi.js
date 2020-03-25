import apiClient from './apiClient';
import {
  GET_TEMPLATE_URL,
  TOUR_OPERATOR_URL,
  TOUR_TRANSACTION_URL,
} from './apiUrl';

export const getReadyPackageListApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${GET_TEMPLATE_URL}/ReadyPackage/All`);
};

export const getSeriesPackageListApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${GET_TEMPLATE_URL}/FixedPackage/All`);
};

export const getReadyPackageFixedPriceListApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${GET_TEMPLATE_URL}/VariableDate/All`);
};

export const getSeriesPackageByIdApi = (id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${GET_TEMPLATE_URL}/Fixed/${id}`);
};

export const getReadyPackageFixedPriceByIdApi = (id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${GET_TEMPLATE_URL}/FixedDateVariable/${id}`);
};

export const getReadyPackageByIdApi = (id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${GET_TEMPLATE_URL}/Ready/${id}`);
};

export const getTourOperatorProfileByIdApi = (id, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(`${TOUR_OPERATOR_URL}/ById/${id}`);
};

export const postCreateCustomOnBeHalfApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.post(`${TOUR_TRANSACTION_URL}/CreateTour/OnBehalf`, data);
};

export const postEditQuotationApi = (tourTransactionId, data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.post(
    `${TOUR_TRANSACTION_URL}/EditQuotation?tourTransactionId=${tourTransactionId}`,
    data
  );
};

export const postJoinTourApi = (data, type, packageId, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.post(
    `/TourTransactions/JoinTour/OnBehalf/${packageId}`,
    data
  );
};

export const getTourSummaryByIdApi = (tourTransactionId, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(
    `${TOUR_TRANSACTION_URL}/TransactionSummary?id=${tourTransactionId}`
  );
};

export const getTransactionHistoryByStatusApi = (status, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.get(
    `${TOUR_TRANSACTION_URL}/TransactionHistory?status=${status}`
  );
};

export const getDemoJoinTourApi = (id, item, status, authToken) => {
  const URL =
    status == 'Fixed'
      ? '/TourTransactions/Demo/JoinTour'
      : '/TourTransactions/Demo/JoinTour/VariableDate';
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.post(`${URL}/${id}`, item);
};

export const getDemoCreateTour = (item, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.post(`/TourTransactions/DemoPrice`, item);
};

export const sendEmailConfirmationApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.post(
    `/TourTransactions/EmailSendConfirmation?tourTransactionCode=${data.Id}&emailSendConfirmed=${data.emailSendConfirmed}`
  );
};

export const postSpecialAdjusmentApi = (data, authToken) => {
  apiClient.defaults.headers['Authorization'] = 'Bearer ' + authToken;
  return apiClient.post(`${TOUR_TRANSACTION_URL}/AdditionalItems`, data);
};
