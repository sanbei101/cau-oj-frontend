import axios, { ApiPath, resolveError } from '@/api';
import type { Page, Problem, ProblemData } from '@/api/type';
import { useStore } from '@/store';
import type { AxiosResponse } from 'axios';

/**
 * 题目接口
 */
const ProblemApi = {
  /**
   * 获取开放的题目
   */
  async getAllOpened(page: number, size: number, keyword: string | null = null): Promise<Page<Problem>> {
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

  async getAll(page: number, size: number, keyword: string | null = null): Promise<Page<Problem>> {
    try {
      const res = await axios({
        url: ApiPath.PROBLEM_ADMIN,
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
    const userInfo = useStore().user.userInfo;
    const path = userInfo == null || userInfo.role === 1 ? ApiPath.PROBLEM : ApiPath.PROBLEM_ADMIN;

    try {
      const res = await axios({
        url: `${path}/${pid}`,
        method: 'GET'
      });

      return res.data as Problem;
    } catch (error) {
      throw resolveError(error);
    }
  },

  /**
   * 设在题目开放/关闭
   */
  async changeState(pid: number, enable: boolean): Promise<AxiosResponse> {
    try {
      const res = await axios({
        url: `${ApiPath.PROBLEM_ADMIN}/${pid}`,
        method: 'PUT',
        params: {
          enable
        }
      });
      return res;
    } catch (error) {
      throw resolveError(error);
    }
  },

  /**
   * 保存题目
   */
  async save(problem: Problem, create = false): Promise<AxiosResponse> {
    try {
      const res = await axios({
        url: ApiPath.PROBLEM_ADMIN,
        method: create ? 'POST' : 'PUT',
        data: JSON.stringify(problem)
      });
      return res;
    } catch (error) {
      throw resolveError(error);
    }
  },

  /**
   * 保存测试数据配置
   */
  async saveDataConf(pid: number, data: { [key: string]: number }): Promise<AxiosResponse> {
    try {
      const res = await axios({
        url: `${ApiPath.PROBLEM_ADMIN}/data_conf`,
        method: 'POST',
        data: JSON.stringify({
          problemId: pid,
          conf: data
        })
      });
      return res;
    } catch (error) {
      throw resolveError(error);
    }
  },

  /**
   * 删除题目
   */
  async delete(pid: number): Promise<AxiosResponse> {
    try {
      const res = await axios({
        url: `${ApiPath.PROBLEM_ADMIN}/${pid}`,
        method: 'DELETE'
      });
      return res;
    } catch (error) {
      throw resolveError(error);
    }
  },

  /**
   * 获取测试数据
   */
  async getProblemData(pid: number): Promise<ProblemData> {
    try {
      const res = await axios({
        url: `${ApiPath.TEST_DATA}/${pid}`,
        method: 'GET'
      });
      return res.data as ProblemData;
    } catch (error) {
      throw resolveError(error);
    }
  },

  /**
   * 下载测试数据
   */
  async downloadData(pid: number, fileName: string): Promise<void> {
    const url = `${ApiPath.TEST_DATA}/download/${pid}/${fileName}`;
    try {
      const res = await axios({
        url,
        method: 'GET',
        responseType: 'blob'
      });
      const objectUrl = window.URL.createObjectURL(res.data);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = fileName;
      anchor.click();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      throw resolveError(error);
    }
  },

  /**
   * 删除测试数据
   */
  async deleteTestData(pid: number, fileName: string): Promise<AxiosResponse> {
    try {
      const res = await axios({
        url: `${ApiPath.TEST_DATA}/${pid}`,
        method: 'DELETE',
        params: {
          name: fileName
        }
      });
      return res;
    } catch (error) {
      throw resolveError(error);
    }
  },

  async saveSPJ(pid: number, source: string): Promise<AxiosResponse> {
    try {
      const res = await axios({
        url: ApiPath.SPJ,
        method: 'POST',
        data: JSON.stringify({ pid, source })
      });
      return res;
    } catch (error) {
      throw resolveError(error);
    }
  },

  async deleteSPJ(pid: number): Promise<AxiosResponse> {
    try {
      const res = await axios({
        url: `${ApiPath.SPJ}/${pid}`,
        method: 'DELETE'
      });
      return res;
    } catch (error) {
      throw resolveError(error);
    }
  }
};

export default ProblemApi;
