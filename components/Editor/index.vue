<template>
  <div ref="refEditor" id="editor"></div>
</template>

<script lang="ts" setup>
import {Api} from '~/api';
import {OutputBlockData} from '@editorjs/editorjs';

const props = defineProps<{
  modelValue: OutputBlockData[];
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

/**
 * Вычисляемые значения ----------------
 */
// Значения поля ввода
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', JSON.stringify(val));
  },
});

const refEditor = ref(undefined);

onMounted(async () => {
  const {default: EditorJS} = await import('@editorjs/editorjs');
  const {default: Header} = await import('@editorjs/header');
  const {default: List} = await import('@editorjs/list');
  const {default: Quote} = await import('@editorjs/quote');
  const {default: Table} = await import('@editorjs/table');
  const {default: Embed} = await import('@editorjs/embed');
  const {default: Image} = await import('@editorjs/image');
  const {default: CodeBox} = await import('@bomdi/codebox');
  const {default: Delimiter} = await import('@editorjs/delimiter');
  const {default: InlineCode} = await import('@editorjs/inline-code');
  const {default: LinkTool} = await import('@editorjs/link');
  const {default: SimpleImage} = await import('@editorjs/simple-image');
  const {default: CheckList} = await import('@editorjs/checklist');

  const editor = new EditorJS({
    holder: refEditor.value,
    placeholder: 'Введите текст',
    autofocus: true,
    data: {
      blocks: model.value,
    },
    async onChange() {
      const {blocks} = await editor.save();
      model.value = blocks;
    },
    tools: {
      header: Header,
      list: List,
      codeBox: CodeBox,
      linkTool: LinkTool,
      embed: Embed,
      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: 'Введите цитату',
          captionPlaceholder: 'Введите автора',
        },
      },
      checklist: CheckList,
      delimiter: Delimiter,
      inlineCode: InlineCode,
      simpleImage: SimpleImage,
      table: Table,
    },
  });
});
</script>

<style lang="scss">
#editor svg {
  fill: none;
}

.codex-editor__redactor {
  padding-bottom: 100px;
}

.codex-editor .ce-toolbar__content,
.ce-block__content {
  max-width: 900px;
}

.cdx-quote {
  .cdx-input {
    display: block;
  }
}

.cdx-input {
  display: none;
}
</style>
