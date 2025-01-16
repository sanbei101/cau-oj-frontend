import { ErrorMessage } from '@/api/type';
import { defineStore } from 'pinia';

type State = {
  theme: 'light' | 'dark' | null;
  error: ErrorMessage | null;
};

export const useAppStore = defineStore('app', {
  state: (): State => ({
    theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
    error: null
  }),
  actions: {
    setTheme(value: string) {
      if (value === 'dark') {
        this.theme = 'dark';
        localStorage.setItem('theme', 'dark');
      } else {
        this.theme = 'light';
        localStorage.setItem('theme', 'light');
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
