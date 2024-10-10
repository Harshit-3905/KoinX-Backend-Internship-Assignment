import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { COINGECKO_API_KEY } from '../config/env';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: "https://api.coingecko.com/api/v3/coins/",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-cg-api-key': COINGECKO_API_KEY,
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export default axiosInstance;
