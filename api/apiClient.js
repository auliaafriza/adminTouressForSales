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
    // 'XvriIvv_DLEp32PUup8fktF8KJ925ULLK1xpJmSgBspf0jKageE4EtYISX6jBSQs7Rg_EaLNC8_CNEEr5YuD9qzn53csapYuqscBaUr__P7z_Uf0K3KH4dtEG1YJORroaABkk0fFyprjXrdxn_7eSLgffBNJq7Y7yAd1J3zlBN7GCwT9e4w3eeBBS36cCrZKgtUmNxsl4RaDuTPgdXE0VrDiX-dHFhqbxnoqXGvmGVfBy65a7IgrlgviU1DTXVEYNmUznKScQPb0tEGmX6dNmZp4XVOQL6ADn1lsqOiemUe6yIwLwjsMJiB3H0YmItyvffAIm_m0xFUsy46Hd4-7SPM6NXJ_J61a0gntUX60mcM2_6YITxbfCKgKm2ySTfqZNjej_JBkjHzcraMDeCJrWjFZ_HFHtb2SatY-P5FJ0tSnV3TNMvVVfBcrpnGgFEhM-1A62ZdJyI2v5xylUXR-E5z-cF079Ybf_wY8PK7w5KbtHdc7pFJUb38CwuyrF_epIcmnDXF_h-EQ9rjY6bCOCrpkXKP931k6SZ9d_O-pZJI',
    // AsyncStorage.getItem('token'),
  },
});

export default apiClient;
