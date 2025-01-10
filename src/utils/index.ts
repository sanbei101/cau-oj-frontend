import { h } from 'vue';
import { NIcon } from 'naive-ui';

type StateTag = {
  type: 'info' | 'error' | 'success';
  state: string;
  icon: any;
};

function setTitle(title: string) {
  document.title = `${title} - Cloud OJ`;
}

const renderIcon = (icon: any, color: string | undefined = undefined) => {
  return () =>
    h(NIcon, color == null ? null : { color }, {
      default: () => h(icon)
    });
};

function timeUsage(val?: number): string {
  if (val) {
    return `${(val / 1000).toFixed(2)} ms`;
  }

  return '-';
}

function ramUsage(val?: number): string {
  if (val) {
    if (val >= 1024) {
      return `${(val / 1024).toFixed(2)} MB`;
    } else {
      return `${val} KB`;
    }
  }

  return '-';
}

export { default as LanguageUtil } from './LanguageUtil';
export { setTitle, renderIcon, timeUsage, ramUsage };
export type { StateTag };
