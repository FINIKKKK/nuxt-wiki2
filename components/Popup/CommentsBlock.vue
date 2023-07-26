<template>
  <Popup
    :isOpen="props.isOpen"
    :title="$t.commentsPopup.title"
    @close="emits('close')"
  >
    <EditorBody :data="elemController.activeCommentBlock" class="body" />

    <UIInput
      :label="$t.commentsPopup.input"
      v-model="inputValue"
      btnType="fill"
    >
      <template #btn2>
        <i class="fa-regular fa-paper-plane" />
      </template>
    </UIInput>
  </Popup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useElemStore } from '~/stores/ElemController';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isOpen: boolean;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['close']);

/**
 * Переменные ----------------
 */
const inputValue = ref('');
const elemController = useElemStore();
const $t = await useTranslate('elem');
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.body {
  margin-bottom: 25px;
  border-left: 1px solid rgba($yellow, 1);
  padding-left: 20px;
}
</style>
