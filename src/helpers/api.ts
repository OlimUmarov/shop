import axios from 'axios';

let isRetry = false;

export const $api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json'
  },
});


$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config; 
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      if (!isRetry) {
        isRetry = true;
      }
      return $api.request(originalRequest);
    } catch (e) {
      throw e;
    }
  }
  console.log(error.response?.data?.message);
  throw error;
});
