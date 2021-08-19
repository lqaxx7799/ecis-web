import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import config from '../../config';

const appToken = Cookies.get('appToken') || '';
const requestConfig: AxiosRequestConfig = {
  headers: {
    Authorization: 'Bearer ' + appToken,
  },
};
const getFullURL = (path: string) => `${config.BASE_API}${path}`;

const request = {
  get: (path: string) =>
    axios.get(getFullURL(path), requestConfig).then((res) => res.data),
  post: (path: string, body: any) =>
    axios.post(getFullURL(path), body, requestConfig).then((res) => res.data),
  patch: (path: string, body: any) =>
    axios.patch(getFullURL(path), body, requestConfig).then((res) => res.data),
  put: (path: string, body: any) =>
    axios.put(getFullURL(path), body, requestConfig).then((res) => res.data),
  del: (path: string) =>
    axios.delete(getFullURL(path), requestConfig).then((res) => res.data),
};

export default request;
