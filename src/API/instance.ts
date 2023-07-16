import axios from 'axios';
import {REACT_APP_API_URL} from '@env';
import {getTokenFromAsyncStorage} from '../utils';

// const API_URL = 'http://10.0.2.2:4200/api';

const $api = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

$api.interceptors.request.use(async config => {
  try {
    const token = await getTokenFromAsyncStorage();
    config.headers.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.log(error);
  }
  return config;
});

export default $api;
