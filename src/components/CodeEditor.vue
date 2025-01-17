<template>
  <div class="code-editor">
    <n-input-group>
      <n-input-group-label :style="{ width: '110px' }"> 选择语言 </n-input-group-label>
      <n-select v-model:value="language" :options="languageOptions" />
      <n-button type="primary" secondary :loading="loading" @click="submit">
        <template #icon>
          <n-icon>
            <send-round />
          </n-icon>
        </template>
        提交运行
      </n-button>
    </n-input-group>
    <div class="editor-wrapper" :class="theme">
      <textarea ref="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SourceCode } from '@/type';
import { SendRound } from '@vicons/material';
import CodeMirror, { type Editor, type EditorConfiguration } from 'codemirror';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/ttcn.css';
import { NButton, NIcon, NInputGroup, NInputGroupLabel, NSelect } from 'naive-ui';
import { nextTick, onMounted, ref, watch } from 'vue';
// 支持的语言
const languageOptions = ref([
  {
    label: 'Python',
    value: 'python'
  },
  {
    label: 'C',
    value: 'c'
  },
  {
    label: 'C++',
    value: 'cpp'
  }
]);
// CodeMirror 语言模式
const Modes: Record<string, string> = {
  c: 'text/x-csrc',
  cpp: 'text/x-c++src',
  java: 'text/x-java',
  python: 'text/x-python',
  javascript: 'text/javascript',
  go: 'text/x-go'
};

const cmOptions = ref<EditorConfiguration>({
  mode: Modes.c,
  tabSize: 4,
  smartIndent: true,
  indentUnit: 4,
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  scrollbarStyle: 'null'
});

const language = ref<string>('c');
const editor = ref<HTMLTextAreaElement | null>(null);

let cmEditor: Editor | null = null;

const props = withDefaults(
  defineProps<{
    value: string;
    loading: boolean;
    theme: 'light' | 'dark';
  }>(),
  {
    value: '',
    loading: false,
    theme: 'light'
  }
);

const emit = defineEmits<{
  submit: [sourceCode: SourceCode];
}>();
const submit = () => {
  const sourceCode: SourceCode = {
    language: language.value,
    code: cmEditor!.getValue()
  };
  emit('submit', sourceCode);
  console.log(cmEditor!.getValue());
};
watch(
  () => props.theme,
  (val) => {
    if (val === 'light') {
      cmOptions.value.theme = 'ttcn';
    } else {
      cmOptions.value.theme = 'material-darker';
    }
  },
  { immediate: true }
);

watch(language, (val) => {
  cmOptions.value.mode = Modes[val];
});

watch(
  cmOptions,
  (val) => {
    nextTick(() => {
      cmEditor!.setOption('mode', val.mode);
      cmEditor!.setOption('theme', val.theme);
    });
  },
  { deep: true, immediate: true }
);

watch(
  () => props.value,
  (val) => {
    nextTick(() => {
      cmEditor!.setValue(val);
    });
  }
);

onMounted(() => {
  cmEditor = CodeMirror.fromTextArea(editor.value!, cmOptions.value);
  cmEditor.setValue(props.value);
});
</script>

<style scoped lang="scss">
.code-editor {
  display: flex;
  flex-direction: column;
  height: 100%;

  .editor-wrapper {
    margin-top: 5px;
    height: calc(100% - 39px);
  }

  .editor-wrapper {
    :deep(.CodeMirror) {
      height: 100%;
      font-size: 14px;
      font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
    }

    &.dark {
      :deep(.CodeMirror-overlayscroll-horizontal div),
      :deep(.CodeMirror-overlayscroll-vertical div) {
        width: 5px;
        background-color: #5c6065;
      }
    }
  }
}
</style>
