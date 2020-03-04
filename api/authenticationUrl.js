import apiClient from "./apiClient";
import { POST_LOGIN_URL } from "./apiUrl";

const postLoginApi = data => {
  return apiClient.post(POST_LOGIN_URL, data);
};

export { postLoginApi };
