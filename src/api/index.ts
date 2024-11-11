import { useStore } from '@/store';
import _axios, { AxiosError } from 'axios';
import { ErrorMessage, UserInfo } from './type';

const ApiPath = {
  PROBLEM: '/api/core/problem',

  SUBMIT: '/api/judge/submit'
};

function resolveError(error: any): ErrorMessage {
  const err = error as AxiosError;
  if (err.response) {
    if (err.response.data && err.response.headers['content-type'] === 'application/json') {
      return ErrorMessage.from(err.response.data);
    } else {
      return new ErrorMessage(err.response.status, err.response.statusText);
    }
  } else if (err.request) {
    return new ErrorMessage(0, '请求失败');
  } else {
    return new ErrorMessage(-1, err.message);
  }
}

function buildHeaders(userInfo: UserInfo | null): any {
  if (userInfo == null) {
    return {
      'Content-Type': 'application/json'
    };
  } else {
    return {
      'Content-Type': 'application/json',
      Authorization: `Baerer ${userInfo.token}`
    };
  }
}

const axios = _axios.create();

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const user = useStore().user;
    config.headers = buildHeaders(user.userInfo);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
export { ApiPath, resolveError };
