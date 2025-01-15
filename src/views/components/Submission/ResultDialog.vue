<template>
  <n-result title="OJ 代码评测结果" status="success" size="large">
    <template #default>
      <n-data-table :columns="columns" :data="tableData.results" size="large" :pagination="false" />
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { NResult, NDataTable, type DataTableColumns } from 'naive-ui';
import { ErrorMessage, JudgeResult, SingleResult, SubmitData } from '@/api/type';
import { JudgeApi } from '@/api/request';
import { useStore } from '@/store';
const store = useStore();
const props = defineProps<{
  submitData: SubmitData;
}>();

const columns: DataTableColumns<SingleResult> = [
  {
    title: '结果',
    key: 'is_success',
    render(row: SingleResult) {
      return row.is_success ? '通过' : '失败';
    }
  },
  {
    title: '严格匹配',
    key: 'is_strict_success',
    render(row: SingleResult) {
      return row.is_strict_success ? '是' : '否';
    }
  },
  {
    title: '期望输出',
    key: 'expected_output'
  },
  {
    title: '实际输出',
    key: 'actual_output'
  }
];

const tableData = ref<JudgeResult>({ count: 0, results: [] });
onBeforeMount(() => {
  console.log(props.submitData);
  JudgeApi.submit(props.submitData)
    .then((data) => {
      console.log(data);
      tableData.value = data;
    })
    .catch((err: ErrorMessage) => {
      store.app.setError(err);
    });
});
</script>
