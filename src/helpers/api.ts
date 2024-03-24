import axios from 'axios';

declare const process: {
    env: {
      API_URL: string;
    };
  };

let isRetry = false;

export const $api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
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
