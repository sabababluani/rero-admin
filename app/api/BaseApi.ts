import axios from 'axios';
import getToken from './getToken';
import { useRouter } from 'next/router';

const BaseApi = axios.create({
  baseURL: 'https://back.reroapp.ge',
});

BaseApi.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

BaseApi.interceptors.response.use(
  (response) => response, // Handle successful responses
  (error) => {
    if (error.response?.status === 401) {
      const router = useRouter(); // Create an instance of the router
      router.push('/login'); // Redirect to login page
    }
    return Promise.reject(error); // Reject any other errors
  },
);

export default BaseApi;
