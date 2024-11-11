<template>
  <div class="wrap">
    <div>
      <n-space vertical size="large">
        <n-space align="center">
          <n-input-group>
            <n-input
              v-model:value="keyword"
              maxlength="10"
              show-count
              clearable
              placeholder="输入题目名称、分类"
              @clear="search" />
            <n-button type="primary" @click="search">
              搜索题目
              <template #icon>
                <n-icon>
                  <search-round />
                </n-icon>
              </template>
            </n-button>
          </n-input-group>
        </n-space>
        <n-data-table single-column :columns="problemColumns" :data="problems.data" :loading="loading" />
        <n-pagination
          v-model:page="pagination.page"
          :page-size="pagination.pageSize"
          :item-count="problems.total"
          @update:page="pageChange">
          <template #prefix="{ itemCount }"> 共 {{ itemCount }} 项</template>
        </n-pagination>
      </n-space>
    </div>
  </div>
</template>

<script lang="tsx">
export default {
  name: 'ProblemList'
};
</script>

<script setup lang="tsx">
import { ProblemApi } from '@/api/request';
import { ErrorMessage, type Page, Problem } from '@/api/type';
import { useStore } from '@/store';
import { setTitle } from '@/utils';
import { SearchRound } from '@vicons/material';
import {
  type DataTableColumns,
  NButton,
  NDataTable,
  NIcon,
  NInput,
  NInputGroup,
  NPagination,
  NSpace,
  NTag
} from 'naive-ui';
import { nextTick, onBeforeMount, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const pagination = ref({
  page: 1,
  pageSize: 20
});

const loading = ref<boolean>(true);

/* 表格列配置 */
const problemColumns: DataTableColumns<Problem> = [
  {
    title: '#',
    key: '#',
    align: 'right',
    width: 50,
    render: (_, rowIndex: number) => (
      <span>{(pagination.value.page - 1) * pagination.value.pageSize + rowIndex + 1}</span>
    )
  },
  {
    title: 'ID',
    key: 'problemId',
    align: 'right',
    width: 70
  },
  {
    title: '题名',
    key: 'title',
    render: (row) => (
      <RouterLink to={{ name: 'submission', params: { pid: row.problemId } }}>
        <NButton text={true} strong={true}>
          {row.title}
        </NButton>
      </RouterLink>
    )
  },
  {
    title: '分类',
    key: 'category',
    align: 'center',
    render: (row) => {
      const tags = row.tags;
      return tags.map((tag) => {
        return (
          <NTag
            class="tag"
            size="small"
            type="primary"
            round
            bordered={false}
            // @ts-ignore
            onClick={() => tagClick(tag)}>
            {tag}
          </NTag>
        );
      });
    }
  }
];

/* 题目数据 */
const problems = ref<Page<Problem>>({
  data: [],
  total: 0
});

const keyword = ref<string>('');

onBeforeMount(() => {
  setTitle('题目');

  if ('page' in route.query) {
    pagination.value.page = Number(route.query.page);
  }

  if ('keyword' in route.query) {
    keyword.value = String(route.query.keyword);
  }

  queryProblems();
});

function pageChange(page: number) {
  router.push({
    query: { page }
  });

  queryProblems();
}

function tagClick(tag: string) {
  keyword.value = tag;
  search();
}

function search() {
  nextTick(() => {
    if (keyword.value !== '') {
      pagination.value.page = 1;
      router.push({
        query: { keyword: keyword.value, page: 1 }
      });
    }

    queryProblems();
  });
}

/**
 * 获取题目
 */
function queryProblems() {
  loading.value = true;
  const { page, pageSize } = pagination.value;
  ProblemApi.getAll(page, pageSize, keyword.value)
    .then((data) => {
      problems.value = data;
    })
    .catch((err: ErrorMessage) => {
      store.app.setError(err);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
