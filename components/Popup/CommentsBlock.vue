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

    <Comments :isBlocks="true" />
  </Popup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useElemStore } from '~/stores/ElemController';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCommentsStore } from '~/stores/CommentsController';

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
const route = useRoute();
const elemController = useElemStore();
const teamController = useTeamStore();
const commentsController = useCommentsStore();
const $t = await useTranslate('comments');

/**
 * Методы ----------------
 */
// Добавить комментарий
const onAddComment = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    comment: commentsController.fieldValuePopup,
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

  if (data) {
    // Добавить комментарий в массив
    commentsController.addCommentPopup(data);
    // Очистить поле
    commentsController.changeFieldValuePopup('');
  }
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
