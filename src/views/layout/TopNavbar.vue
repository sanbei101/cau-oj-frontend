<template>
  <div class="top-nav" :class="route.name">
    <div class="app-name">
      <logo :size="40" />
    </div>
    <div style="margin-left: 50px">
      <n-menu :value="routeName" mode="horizontal" :options="navMenuOptions" />
    </div>
    <div style="margin-left: auto">
      <n-space size="large" align="center">
        <theme-switch />
      </n-space>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { Logo } from '@/components';
import { NMenu, NSpace } from 'naive-ui';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import ThemeSwitch from './ThemeSwitch.vue';

const route = useRoute();

const routeName = computed(() => route.name?.toString());

const navMenuOptions = [
  {
    label: () => <RouterLink to={{ name: 'problems' }}>题目</RouterLink>,
    key: 'problems'
  },
  {
    label: () => <RouterLink to={{ name: 'help' }}>帮助</RouterLink>,
    key: 'help'
  }
];
</script>

<style scoped lang="scss">
.top-nav {
  height: calc(var(--header-height) - 1px);
  padding: 0 calc(var(--layout-padding) * 2);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &.submission {
    min-width: calc(720px + var(--layout-padding) * 2);
  }

  .app-name {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 500;

    .logo {
      margin-right: 12px;
    }
  }
}
</style>
