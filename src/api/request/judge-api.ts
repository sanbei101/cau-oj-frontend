import axios from '@/api';
import { SubmitData, JudgeResult } from '@/api/type';
import { ApiPath, resolveError } from '..';

const JudgeApi = {
  async submit(data: SubmitData): Promise<JudgeResult> {
    try {
      const res = await axios.post(ApiPath.SUBMIT, {
        language: data.language,
        problem_id: data.problemId,
        code: btoa(data.sourceCode) // 将代码内容进行 base64 编码
      });
      return res.data as JudgeResult;
    } catch (error) {
      throw resolveError(error);
    }
  }
};

export default JudgeApi;
