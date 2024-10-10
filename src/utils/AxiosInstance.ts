import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: "https://api.coingecko.com/api/v3/coins/",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-cg-api-key': process.env.COINGECKO_API_KEY,
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export default axiosInstance;
