<template>
  <n-spin :show="loading">
    <n-result :title="Title" :status="Status" size="large">
      <template #default>
        <n-data-table :columns="columns" :data="tableData.results" :loading="loading" :pagination="false" :single-line="false" />
      </template>
    </n-result>
  </n-spin>
</template>

<script setup lang="tsx">
import { ref, computed, onMounted } from 'vue';
import { CheckmarkCircle, CloseCircle } from '@vicons/ionicons5';
import { NResult, NDataTable, NSpin, type DataTableColumns, NTag, NIcon, type ResultProps, useMessage } from 'naive-ui';
import { ErrorMessage, JudgeResult, SingleResult, SubmitData } from '@/api/type';
import { JudgeApi } from '@/api/request';
import { useStore } from '@/store';
const message = useMessage();
const store = useStore();
const loading = ref<boolean>(false);
const props = defineProps<{
  submitData: SubmitData;
}>();

const Status = computed<ResultProps['status']>(() => {
  const totalCount = tableData.value.count;
  if (totalCount === 0) return 'info';
  const successCount = tableData.value.results.filter((result) => result.is_success).length;
  if (successCount === totalCount) {
    message.success('全部通过');
    return 'success';
  }
  if (successCount === 0) {
    message.error('失败了哦');
    return 'error';
  } else {
    message.warning('部分通过');
    return 'warning';
  }
});

const Title = computed<string>(() => {
  if (loading.value) return '评测中...';
  return '评测结果';
});

const columns: DataTableColumns<SingleResult> = [
  {
    title: '结果',
    key: 'is_success',
    align: 'center',
    render: (row) => {
      return (
        <NTag type={row.is_success ? 'success' : 'error'} round bordered={false}>
          {{
            icon: () => <NIcon>{row.is_success ? <CheckmarkCircle /> : <CloseCircle />}</NIcon>,
            default: () => (row.is_success ? '通过' : '未通过')
          }}
        </NTag>
      );
    }
  },
  {
    title: '严格匹配',
    key: 'is_strict_success',
    align: 'center',
    render: (row) => {
      return (
        <NTag type={row.is_strict_success ? 'success' : 'error'} round bordered={false}>
          {{
            icon: () => <NIcon>{row.is_strict_success ? <CheckmarkCircle /> : <CloseCircle />}</NIcon>,
            default: () => (row.is_strict_success ? '通过' : '未通过')
          }}
        </NTag>
      );
    }
  },
  {
    title: '期望输出',
    key: 'expected_output',
    align: 'center',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '实际输出',
    key: 'actual_output',
    align: 'center',
    ellipsis: {
      tooltip: true
    }
  }
];

const tableData = ref<JudgeResult>({ count: 0, results: [] });

onMounted(() => {
  console.log(props.submitData.sourceCode);
  loading.value = true;
  JudgeApi.submit(props.submitData)
    .then((data) => {
      console.log(data);
      tableData.value = data;
      loading.value = false;
    })
    .catch((err: ErrorMessage) => {
      store.app.setError(err);
    });
});
</script>
