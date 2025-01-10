import { defineStore } from 'pinia';
import { useAppStore } from './app';

export const useStore = defineStore('store', {
  state: () => ({
    app: useAppStore()
  })
});
