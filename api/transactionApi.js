import apiClient from './apiClient';
import {
  GET_TEMPLATE_URL,
  TOUR_OPERATOR_URL,
  TOUR_TRANSACTION_URL,
} from './apiUrl';

export const getReadyPackageListApi = data => {
  return apiClient.get(`${GET_TEMPLATE_URL}/ReadyPackage/All`);
};

export const getSeriesPackageListApi = data => {
  return apiClient.get(`${GET_TEMPLATE_URL}/FixedPackage/All`);
};

export const getReadyPackageFixedPriceListApi = data => {
  return apiClient.get(`${GET_TEMPLATE_URL}/VariableDate/All`);
};

export const getSeriesPackageByIdApi = id => {
  return apiClient.get(`${GET_TEMPLATE_URL}/Fixed/${id}`);
};

export const getReadyPackageFixedPriceByIdApi = id => {
  return apiClient.get(`${GET_TEMPLATE_URL}/FixedDateVariable/${id}`);
};

export const getReadyPackageByIdApi = id => {
  return apiClient.get(`${GET_TEMPLATE_URL}/Ready/${id}`);
};

export const getTourOperatorProfileByIdApi = id => {
  return apiClient.get(`${TOUR_OPERATOR_URL}/ById/${id}`);
};

// export const postCreateCustomApi = id => {
//   return apiClient.get(`${TOUR_OPERATOR_URL}/ById/${id}`);
// };

export const postCreateCustomOnBeHalfApi = data => {
  return apiClient.post(`${TOUR_TRANSACTION_URL}/CreateTour/OnBehalf`, data);
};

export const postEditQuotationApi = (tourTransactionId, data) => {
  return apiClient.post(
    `${TOUR_TRANSACTION_URL}/EditQuotation?tourTransactionId=${tourTransactionId}`,
    data
  );
};

export const postJoinTourApi = (data, type, packageId) => {
  return apiClient.post(
    type === 'FixedDateVariable'
      ? (`${TOUR_TRANSACTION_URL}/JoinTour/VariableDate/${packageId}`, data)
      : (`${TOUR_TRANSACTION_URL}/JoinTour/${packageId}`, data)
  );
};

export const getTourSummaryByIdApi = (tourTransactionId, data) => {
  return apiClient.post(
    `${TOUR_TRANSACTION_URL}/TransactionSummary?id=${tourTransactionId}`,
    data
  );
};
