import { ErrorMessage } from '@/api/type';
import { darkTheme, type GlobalTheme } from 'naive-ui';
import { defineStore } from 'pinia';

const THEME = 'theme';
const theme = localStorage.getItem(THEME);

type State = {
  theme: GlobalTheme | null;
  error: ErrorMessage | null;
};

export const useAppStore = defineStore('app', {
  state: (): State => ({
    theme: theme === 'dark' ? darkTheme : null,
    error: null
  }),
  actions: {
    setTheme(value: string | null) {
      if (value === 'dark') {
        this.theme = darkTheme;
        localStorage.setItem(THEME, 'dark');
      } else {
        this.theme = null;
        localStorage.removeItem(THEME);
      }
    },
    setError(value: ErrorMessage | null) {
      this.error = value;
      if (value != null) {
        this.router.replace({ name: 'error' });
      }
    }
  }
});
