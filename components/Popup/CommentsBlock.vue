<template>
  <Popup
    :isOpen="props.isOpen"
    :title="$t.commentsPopup.title"
    @close="emits('close')"
  >
    <EditorBody
      :data="elemController.activeCommentBlock"
      class="body"
      type="mini"
    />

    <UIInput
      :label="$t.commentsPopup.input"
      v-model="inputValue"
      btnType="fill"
      @btnClick="onAddComment"
    >
      <template #btn2 v-if="inputValue">
        <i class="fa-regular fa-paper-plane" />
      </template>
    </UIInput>


  </Popup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useElemStore } from '~/stores/ElemController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';

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
const route = useRoute();
const elemController = useElemStore();
const teamController = useTeamStore();
const $t = await useTranslate('elem');

/**
 * Методы ----------------
 */
// Добавить комментарий
const onAddComment = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    comment: inputValue.value,
    entity_type: 'article',
    entity_id: route.params.id,
    tab_id: elemController.activeTab.id,
    block_id: elemController.blockId,
  };

  // Добавить комментарий
  const { data } = await useCustomFetch(`team/comment/add`, {
    body: dto,
    method: 'POST',
  });
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.body {
  margin-bottom: 35px;
  border-left: 1px solid rgba($yellow, 1);
  padding-left: 20px;
}
</style>
