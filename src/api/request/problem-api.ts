import axios, { ApiPath, resolveError } from '@/api';
import type { Page, Problem } from '@/api/type';

const ProblemApi = {
  /**
   * 获取题目列表
   */
  async getAll(page: number, size: number, keyword: string | null = null): Promise<Page<Problem>> {
    try {
      const res = await axios.get(ApiPath.PROBLEM, {
        params: {
          page,
          size,
          keyword
        }
      });

      return res.data as Page<Problem>;
    } catch (error) {
      throw resolveError(error);
    }
  },

  /**
   * 获取单个题目
   */
  async getSingle(pid: number): Promise<Problem> {
    try {
      const res = await axios.get(ApiPath.SingleProblem, {
        params: {
          id: pid
        }
      });
      return res.data as Problem;
    } catch (error) {
      throw resolveError(error);
    }
  }
};

export default ProblemApi;
