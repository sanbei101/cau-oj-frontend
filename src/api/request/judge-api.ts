import axios from '@/api';
import { SubmitData, JudgeResult } from '@/api/type';
import { ApiPath, resolveError } from '..';

function encodeToBase64(str: string): string {
  // 将字符串转换为 UTF-8 编码的二进制数据
  const utf8Bytes = new TextEncoder().encode(str);
  // 将二进制数据转换为 Base64
  let binaryString = '';
  utf8Bytes.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });
  return btoa(binaryString);
}
const JudgeApi = {
  async submit(data: SubmitData): Promise<JudgeResult> {
    try {
      const res = await axios.post(ApiPath.SUBMIT, {
        language: data.language,
        problem_id: data.problemId,
        code: encodeToBase64(data.sourceCode) // 将代码内容进行 base64 编码
      });
      return res.data as JudgeResult;
    } catch (error) {
      throw resolveError(error);
    }
  }
};

export default JudgeApi;
