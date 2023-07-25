<template>
  <div ref="refEditor" id="editor"></div>
</template>

<script lang="ts" setup>
import { OutputBlockData } from '@editorjs/editorjs';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  modelValue: OutputBlockData[];
  label: string;
}>();

// Значения поля ввода
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

/**
 * Переменные ----------------
 */
const refEditor = ref(undefined);
const teamController = useTeamStore();
const config = useRuntimeConfig();

/**
 * Основная функция ----------------
 */
onMounted(async () => {
  const { default: EditorJS } = await import('@editorjs/editorjs');
  // @ts-ignore
  const { default: Header } = await import('@editorjs/header');
  // @ts-ignore
  const { default: List } = await import('@editorjs/list');
  // @ts-ignore
  const { default: Quote } = await import('@editorjs/quote');
  // @ts-ignore
  const { default: Table } = await import('@editorjs/table');
  // @ts-ignore
  const { default: Embed } = await import('@editorjs/embed');
  // @ts-ignore
  const { default: Image } = await import('@editorjs/image');
  // @ts-ignore
  const { default: CodeBox } = await import('@bomdi/codebox');
  // @ts-ignore
  const { default: Delimiter } = await import('@editorjs/delimiter');
  // @ts-ignore
  const { default: InlineCode } = await import('@editorjs/inline-code');
  // @ts-ignore
  const { default: LinkTool } = await import('@editorjs/link');
  // @ts-ignore
  const { default: CheckList } = await import('@editorjs/checklist');

  /**
   * Editor ----------------
   */
  const editor = new EditorJS({
    holder: refEditor.value,
    placeholder: props.label,
    autofocus: true,

    // Значение
    data: {
      blocks: model.value,
    },

    // Функция изменения данных
    async onChange() {
      const { blocks } = await editor.save();
      model.value = blocks;
    },

    // Инструменты
    tools: {
      header: {
        class: Header,
        config: {
          levels: [2, 3],
        },
      },
      list: List,
      image: {
        class: Image,
        config: {
          buttonContent: 'Выберите изображение',
          uploader: {
            async uploadByFile(file: any) {
              // Данные
              const formData = new FormData();
              formData.append('image', file);
              formData.append('team_id', teamController.activeTeamId);

              // Обновляем аватарку
              const { data } = await useCustomFetch<{ url: string }>(
                'team/store/add',
                { method: 'POST' },
                formData,
              );

              if (data) {
                return {
                  success: 1,
                  file: {
                    url: `${config.public.apiUrl}storage/${data.path}`,
                  },
                };
              }
            },
          },
        },
      },
      delimiter: Delimiter,
      // codeBox: CodeBox,
      inlineCode: InlineCode,
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
  padding-bottom: 100px !important;
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

// headers ###############
.ce-header {
  margin-bottom: 24px;
}

h1.ce-header {
  font-size: 45px;
  line-height: 50px;
}

h2.ce-header {
  font-size: 24px;
  line-height: 32px;
}

h3.ce-header {
  font-size: 20px;
  line-height: 32px;
}

h4.ce-header {
  font-size: 26px;
  line-height: 32px;
}

h5.ce-header {
  font-size: 20px;
  line-height: 28px;
}

h6.ce-header {
  font-size: 16px;
  line-height: 26px;
}
</style>
