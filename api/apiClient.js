import axios from 'axios';
// import { AsyncStorage } from 'react-native';

let backendHost;
// config dev
// backendHost = 'https://touressapidev.azurewebsites.net';
//config qa
backendHost = 'https://touressapiqa.azurewebsites.net/';
//config demo
//backendHost = 'https://touressapidemo.azurewebsites.net/';
//config prod
// backendHost = "https://api.touress.com/";

const API_ROOT = `${backendHost}/Api`;
const apiClient = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
