import axios from "axios";
let backendHost;
// config dev
// backendHost = "https://touressapidev.azurewebsites.net/";
//config qa
backendHost = "https://touressapiqa.azurewebsites.net/";
//config demo
//backendHost = 'https://touressapidemo.azurewebsites.net/';
//config prod
// backendHost = "https://api.touress.com/";

const API_ROOT = `${backendHost}/Api`;
const apiClient = axios.create({
  baseURL: API_ROOT,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      "p4yYl5KAtTX0lXhgEG0Ve6TkoqrVZq1ksUt7O9YByeNkMbeYrfQnKnF1p7Nfp-Z2zlUoLkTQ-0K-LE7lboQTjk3257pNof5QAiaTXm7m1AVfjOQ23xnQ8YLncSIsnYuY5bmraf01Xlu1KF1WtNULTruX7i-zxwUYF9k_-_DgZgOWIB1PNGCSYP53E4AqBAyyCg_yb0ZgZ3YQ4znuMQYNZEeDMs9OX2HgZKyiL6QBVAZgmy2RqZnXLwK3_bD55oIYMkc5WiMnnOSP5yi3uM6J-wYzSzynWFSv9xnPFpTR32JPadhVMPsUP9nx7Yg77o6No3R_6ouTRIaZvS6hiNUWr7NY_l1Qs1PcBu8hOHvwbPVRzrv6YL9clOOBFClD9ggWsVyzWDCXx2ebJy-JF-jYqNDGd_KqR9UJBKUQqInhb6IN-8CFDTkiCsuWjSx7X5L2n1cbRvpZ7ORx1tFtNUiz-B6dW-l6gy11WEfzRVDbLxD-iyY5QoMj4F3mX6WBDNGM"
  }
});

export default apiClient;
