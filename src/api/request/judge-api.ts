import axios, { ApiPath, resolveError } from '@/api';
import type { SubmitData } from '@/api/type';

const JudgeApi = {
  /**
   * 提交代码
   */
  submit(data: SubmitData): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const path = ApiPath.SUBMIT;

      axios({
        url: path,
        method: 'POST',
        data: JSON.stringify(data, (_, v) => v ?? undefined)
      })
        .then((res) => {
          resolve(res.data as number);
        })
        .catch((error) => {
          reject(resolveError(error));
        });
    });
  }
};

export default JudgeApi;
