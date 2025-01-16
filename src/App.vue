<template>
  <n-config-provider abstract :theme="theme" :theme-overrides="themeBase" :locale="zhCN" :date-locale="dateZhCN">
    <n-config-provider abstract :theme-overrides="themeOverrides">
      <n-global-style />
      <router-view v-if="show" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </n-config-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { themeBase, themeDark } from '@/theme';
import { darkTheme, dateZhCN, type GlobalThemeOverrides, NConfigProvider, NGlobalStyle, zhCN } from 'naive-ui';
import { computed, nextTick, onMounted, provide, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const show = ref(true);
const theme = computed(() => (store.app.theme === 'dark' ? darkTheme : null));
const themeStr = computed(() => (store.app.theme === 'dark' ? 'dark' : 'light'));

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  if (store.app.theme === 'dark') {
    return themeDark;
  }

  return {};
});

provide('reload', reload);
provide('themeStr', themeStr);

// 刷新当前路由
function reload() {
  show.value = false;
  nextTick(() => {
    checkToken();
    show.value = true;
  });
}

router.beforeEach((to, from) => {
  if (to.name !== 'error') {
    // 进入正常页面，清空错误信息
    store.app.setError(null);
  } else if (store.app.error === null) {
    // 意外进入错误页面却没有错误信息，返回上一页
    router.replace({ path: from.fullPath });
  }
});

onMounted(() => {
  console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
});

function checkToken() {
  // AuthApi.verify().catch((error: ErrorMessage) => {
  //   // if (error.status === 401) {
  //   //   store.user.clearToken()
  //   //   router.push({ name: "auth", params: { tab: "login" } })
  //   // }
  // });
}
</script>
