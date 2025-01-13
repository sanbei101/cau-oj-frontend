import axios, { ApiPath, resolveError } from '@/api';
import type { Page, Problem } from '@/api/type';

const ProblemApi = {
  /**
   * 获取题目列表
   */
  async getAll(page: number, size: number, keyword: string | null = null): Promise<Page<Problem>> {
    try {
      const res = await axios({
        url: ApiPath.PROBLEM,
        method: 'GET',
        params: {
          page,
          size,
          keyword
        }
      });

      if (res.status === 200) {
        return res.data as Page<Problem>;
      } else {
        return { data: [], total: 0 };
      }
    } catch (error) {
      throw resolveError(error);
    }
  },

  /**
   * 获取单个题目
   */
  async getSingle(pid: number): Promise<Problem> {
    try {
      const res = await axios({
        url: ApiPath.SingleProblem,
        method: 'GET',
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
