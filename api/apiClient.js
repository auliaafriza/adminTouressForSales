import axios from 'axios';
import { AsyncStorage } from 'react-native';
let backendHost;
// config dev
backendHost = 'https://touressapidev.azurewebsites.net';
//config qa
// backendHost = 'https://touressapiqa.azurewebsites.net/';
//config demo
//backendHost = 'https://touressapidemo.azurewebsites.net/';
//config prod
// backendHost = "https://api.touress.com/";

const API_ROOT = `${backendHost}/Api`;
const apiClient = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' +
      'm3jy4QnGAeF5B50G36qesysTE4DwfLsdVvdcJ3kqQugpEzsZ3LUATlVrXrHVr_9FezZYxXHbNMPLuQJBzpjmplmt__oRZghdD6nJkwM8c6F3vBRbjrBiYwqCho5-kmy2kRo8ZcXzjqHzumZ28bdYC5aY48amvH0AsIQoUqE3n7ZPh7mkXN3Fd6qpqQNB7haYYt7CaQVS2ofjdGJOgOE7e3ZlclofuNhv6ShHls0AkdxDf5KB36JzVFxP7lrEg6tYgxLkNBn0H1Jc5yk2sZeoVjlXNy0AsqPx9Q7RF-7eTaPLVTk4Cf2QDdRZcQQwNeUgsq4nzxq8Nn3T95mImrkB70EqrQls-s7gZZYnxmrwLllEFu_2WQ5Zzd_N27ssglod1O450yfCAQmdJFt2SZw9uUU4ZS4mNX08r41Xor7YMc2e9pWBZczHIZKUA217q88N7cF6tUNP85w4waSWYfmtyOxz-IYkiYtUDTgJOvLr9VjwLvoG8Zo1vyxXEI-Bx6Hiw1k0vJSxFJI2lvdIubX6Fm2OVvdx1e7O1ZA7jqc0L5BSRaSyZDfK4tGFU_Mp8yBH',
    // '4RdTVX76gvhXhM16ek9aHwbH9h0RE1NaPPIq0wqIaRJ5AyYHATuYEblzCNxruEZVSDTmDE9LPVr0quQnSN608fzl8cPRzy3NqwPAVXwbQJLnBkAcqHRJ8aCtDGz6naY4DJ5_Gq1ZMiMpJEo48tu6raecSSOh4_LNxoS439OjwNegFNkD_XmXaiWOp6H5mbppgDxTnNvzWwgA1kHqSWVRpkIml6rXMWFegajiGtb-ENnZcFXrVusJbVlGBAr5T897ZxvSx9wezDRmcPXPrc6xvQP3vrzqkjX_jc0-9URO4JwsYweu9DFtkrs9KjiynOMVIn5jhXNOwQJe7GwWHfpYGoun1GA1KtDe7mVaCdnm5NU4FVODiix6sZ_b9IS4MKPOJq_TDMnHtpTRJDhSFxKCxmn69reshmsQotIKtKRny0kzxe5z_e00XdrDehiGJgV8AmJEpQiU3O9AjKxZONDLB-NFTa5V1kTH52_c7U0BRYogoDtmrAy-Kspv5a9DI6Ar6rO7yeN7cg894KebmAXstw',
    // AsyncStorage.getItem('token'),
  },
});

export default apiClient;
