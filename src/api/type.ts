/**
 * 题目
 */
export class Problem {
  problemId?: number;
  title = '';
  description = '';
  tags: Array<string> = [];
}

/**
 * 分页数据
 */
export type Page<T> = {
  data: T[];
  total: number;
};

export type SubmitData = {
  uid: number;
  problemId: number;
  contestId: number | null;
  language: number;
  sourceCode: string;
  type: number;
};

export class JudgeResult {
  solutionId?: string;
  uid?: number;
  username?: string;
  nickname?: string;
  problemId?: number;
  language?: number;
  title?: string;
  state?: number;
  result?: number;
  stateText?: string;
  resultText?: string;
  score?: number;
  total?: number;
  passed?: number;
  time?: number;
  memory?: number;
  errorInfo?: string;
  sourceCode?: string;
  // UNIX_TIMESTAMP(毫秒)
  submitTime?: number;
}

export type Language = {
  count: number;
  language: number;
};

export type Results = {
  [key: string]: number;
  total: number;
};

export class Overview {
  preference: Array<Language> = [];
  results: Results = {
    AC: 0,
    WA: 0,
    CE: 0,
    RE: 0,
    MLE: 0,
    TLE: 0,
    total: 0
  };
  // eg: "YYYY-MM-DD": 10
  activities: { [date: string]: number } = {};
}

export class ErrorMessage {
  timestamp?: number;
  status: number;
  error?: string;
  message: string;

  constructor(status: number, msg: string) {
    this.status = status;
    this.message = msg;
    this.error = msg;
  }

  static from(data: any): ErrorMessage {
    const obj = new ErrorMessage(data.status, data.message);

    if (!data.message) {
      obj.message = data.error;
    }

    obj.error = data.error;
    obj.timestamp = data.timestamp;

    return obj;
  }

  toString() {
    return `${this.status}: ${this.message}`;
  }
}
