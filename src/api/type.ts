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
  // uid: number;
  problemId: number;
  language: string;
  sourceCode: string;
};

export type SingleResult = {
  is_success: boolean;
  is_strict_success: boolean;
  expected_output: string;
  actual_output: string;
};

export type JudgeResult = {
  count: number;
  results: SingleResult[];
};

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
