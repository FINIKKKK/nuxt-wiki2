<template>
  <UIInput
    :label="$t.input"
    v-model="tagsController.inputValue"
    @keydown.enter="onCreateTag"
    @btnClick="onCreateTag"
    :errors="errors['name']"
    class="tag_input"
  >
    <template #btn2>
      <i class="fa-regular fa-plus" />
    </template>
  </UIInput>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useTagsStore } from '~/stores/TagsController';
import { useTeamStore } from '~/stores/TeamContoller';
import { useFormValidation } from '~/hooks/useFormValidation';
import { useCustomFetch } from '~/hooks/useCustomFetch';

/**
 * Переменные ----------------
 */
const tagsController = useTagsStore();
const teamController = useTeamStore();
const $t = await useTranslate('tags');
const { errors, validateForm } = useFormValidation();

/**
 * Методы ----------------
 */
// Создать тэг
const onCreateTag = async () => {
  // Данные
  const dto = {
    team_id: teamController.activeTeamId,
    name: tagsController.inputValue,
  };

  // Валидируем данные
  const isValid = await validateForm(dto, TagScheme);
  if (!isValid) return false;

  // Создать тэг
  const { data } = await useCustomFetch(`team/settings/tags/add`, {
    body: dto,
    method: 'POST',
  });

  if (data) {
    // Добавить новый тэг в список
    tagsController.setTags([...tagsController.tags, data]);
    // Очистить поле
    tagsController.changeInputValue('');
  }
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.tag_input {
  margin-bottom: 45px;
}
</style>
<style lang="scss">
.tag_input {
  .btn-icon {
    margin-top: 0px;
    i {
      font-weight: 400;
    }
  }
}
</style>
