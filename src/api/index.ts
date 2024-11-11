import _axios, { AxiosError } from 'axios';
import { ErrorMessage } from './type';

const ApiPath = {
  PROBLEM: '/core/problem',
  SOLUTION: '/core/solution',
  SUBMIT: '/judge/submit'
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

const axios = _axios.create({
  baseURL: 'http://125.91.126.101:3000'
});
export default axios;
export { ApiPath, resolveError };
