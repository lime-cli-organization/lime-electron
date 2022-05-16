import axios from 'axios';
import { getCookie } from '@/utils/storage';

const service = axios.create({
  baseURL: '',
});

service.interceptors.request.use(
  function (config) {
    config.headers.Authorization = 'Bearer' + ' ' + getCookie('token');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      console.log(error.response.statusText);
    }
  }
);

export default service;
