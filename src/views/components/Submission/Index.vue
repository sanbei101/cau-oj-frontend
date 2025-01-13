<template>
  <div class="submission">
    <Skeleton v-if="loading" />
    <div v-else class="content">
      <n-tabs type="line">
        <n-tab-pane name="problem" tab="题目描述" display-directive="show" style="height: calc(100% - 54px)">
          <n-scrollbar>
            <n-h3 style="margin-bottom: 6px">
              {{ `${problem.problemId}.${problem.title}` }}
            </n-h3>

            <!-- 题目内容 -->
            <markdown-view :content="problem.description" :theme="theme" style="margin-top: 12px" />
          </n-scrollbar>
        </n-tab-pane>
        <n-tab-pane name="solutions" tab="提交记录" display-directive="show" style="height: calc(100% - 54px)">
          <n-scrollbar>
            <n-h3 style="margin-bottom: 6px">
              {{ `${problem.problemId}.${problem.title}` }}
            </n-h3>
          </n-scrollbar>
        </n-tab-pane>
      </n-tabs>
      <!-- 代码编辑器 -->
      <div>
        <code-editor :value="code" :theme="theme" :loading="disableSubmit" @submit="submitClick" />
      </div>
    </div>
  </div>
  <n-modal v-model:show="showResult" :auto-focus="false" :mask-closable="false" preset="card" style="width: 600px; margin-top: 200px">
    <result-dialog :submit-time="submitTime" style="margin-bottom: 12px" />
  </n-modal>
</template>

<script setup lang="ts">
import { JudgeApi, ProblemApi } from '@/api/request';
import { ErrorMessage, Problem, type SubmitData } from '@/api/type';
import { CodeEditor, MarkdownView } from '@/components';
import { useStore } from '@/store';
import { type SourceCode } from '@/type';
import { setTitle } from '@/utils';
import _ from 'lodash';
import { NH3, NModal, NScrollbar, NTabPane, NTabs, useMessage } from 'naive-ui';
import { inject, onBeforeMount, ref, watch } from 'vue';
import ResultDialog from './ResultDialog.vue';
import Skeleton from './Skeleton.vue';

const store = useStore();
const message = useMessage();

const loading = ref<boolean>(true);
const showResult = ref<boolean>(false);
const disableSubmit = ref<boolean>(false);
const problem = ref<Problem>(new Problem());
const code = ref<string>('');
const submitTime = ref<number>(0);

watch(code, (newcode) => {
  console.log(newcode);
});

const theme = inject('themeStr') as 'light' | 'dark';
// const isLoggedIn = computed(() => store.user.isLoggedIn);

const props = defineProps<{
  pid: number;
}>();

const submitClick = _.throttle(submit, 1000);

onBeforeMount(() => {
  queryProblem();
});

/**
 * 获取题目数据
 */
function queryProblem() {
  ProblemApi.getSingle(props.pid)
    .then((data) => {
      setTitle(data.title);
      problem.value = data;
    })
    .catch((err: ErrorMessage) => {
      store.app.setError(err);
    })
    .finally(() => {
      loading.value = false;
    });
}

/**
 * 提交代码
 */
function submit(data: SourceCode) {
  if (data.code.trim().length == 0 || disableSubmit.value) {
    return;
  }

  disableSubmit.value = true;

  const submitData: SubmitData = {
    language: data.language,
    problemId: props.pid,
    sourceCode: data.code.trim(),
    type: 0
  };

  JudgeApi.submit(submitData)
    .then((time) => {
      submitTime.value = time;
      showResult.value = true;
    })
    .catch((err: ErrorMessage) => {
      message.error(err.toString());
    })
    .finally(() => {
      disableSubmit.value = false;
    });
}
</script>

<style scoped lang="scss">
.submission {
  height: calc(100vh - var(--layout-padding) * 4 - var(--header-height) - var(--footer-height));
  width: calc(100% - var(--layout-padding) * 4);
  padding: calc(var(--layout-padding) * 2);
  overflow: hidden;

  .content {
    height: 100%;
    display: flex;
    flex-direction: row;

    & > * {
      flex: 1;
      margin-left: 12px;

      &:first-child {
        margin-left: 0;
      }
    }

    :deep(.n-scrollbar) {
      .n-scrollbar-content {
        display: flex;
        flex-direction: column;
        min-height: 100%;
      }
    }
  }
}
</style>
