<template>
  <div class="tag">
    <!-- Поле редактирования -->
    <input
      type="text"
      v-model="props.data.name"
      v-if="tagsController.editId === props.data.id"
    />
    <!-- Имя тэга -->
    <p v-else>{{ props.data.name }}</p>

    <!--------------------------------------
     Кнопки управления
    ---------------------------------------->
    <div class="btns">
      <!-- Открыть поле редактирования -->
      <i
        class="fa-regular fa-pencil"
        @click="tagsController.changeEditId(props.data.id)"
        :title="$t.edit"
        v-if="!tagsController.editId"
      />
      <!-- Изменить тэг -->
      <i
        class="fa-regular fa-pencil"
        @click="() => onEditTag(props.data.id, props.data.name)"
        :title="$t.edit"
        v-else
      />
      <!-- Отменить редактирование -->
      <i
        class="fa-regular fa-remove"
        @click="tagsController.cancelEdit()"
        v-if="tagsController.editId === props.data.id"
        :title="$t.cancel"
      />
      <!-- Удалить тэг -->
      <i
        class="fa-regular fa-trash"
        @click="() => onRemoveTag(props.data.id)"
        v-if="tagsController.editId !== props.data.id"
        :title="$t.delete"
      />
    </div>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTagsStore } from '~/stores/TagsController';
import { TTag } from '~/utils/types/tag';
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  data: TTag;
}>();

/**
 * Переменные ----------------
 */
const tagsController = useTagsStore();
const teamController = useTeamStore();
const $t = await useTranslate('tags');

/**
 * Методы ----------------
 */

// Изменить тэг
const onEditTag = async (id: number, name: string) => {
  const { message } = await useCustomFetch(`team/settings/tags/edit`, {
    body: {
      team_id: teamController.activeTeamId,
      tag_id: id,
      name,
    },
    method: 'POST',
  });

  if (message) {
    // Отменить редактирование
    tagsController.cancelEdit();
  }
};

// Удалить тэг
const onRemoveTag = async (id: number) => {
  if (window.confirm($t.confirm)) {
    const { message } = await useCustomFetch(`team/settings/tags/delete`, {
      body: {
        team_id: teamController.activeTeamId,
        tag_id: id,
      },
      method: 'POST',
    });

    if (message) {
      // Удалим элемент из массива
      tagsController.setTags(
        tagsController.tags.filter((obj) => obj.id !== id),
      );
    }
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>

.tag {
  &:not(:last-child) {
    margin-right: 25px;
  }
  margin-bottom: 25px;
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
  border: 1px solid rgba($gray, 0.5);
  padding: 8px 18px;
  p {
    font-size: 14px;
    margin-right: 15px;
  }
  input {
    font-size: 14px;
    display: inline-block;
    margin-right: 15px;
  }
  .btns {
    display: flex;
    align-items: center;
    i {
      &:not(:last-child) {
        margin-right: 8px;
      }
      cursor: pointer;
      font-size: 12px;
      color: $gray;
      &:hover {
        color: $blue;
      }
      &.fa-remove {
        font-size: 16px;
      }
    }
  }
}
</style>
