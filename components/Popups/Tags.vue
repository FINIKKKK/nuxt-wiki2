<template>
  <UIAsidePopup
    :title="$t.tagsPopup.title"
    @close="createElemController.closeTags()"
  >
    <p class="text">{{$t.tagsPopup.text}}</p>

    <UIInput
      :label="$t.tagsPopup.input"
      v-model="tagsValue"
      @input="searchTag"
    />
  </UIAsidePopup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCreateElemStore } from '~/stores/CreateElemController';

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const createElemController = useCreateElemStore();
const tagsValue = ref('');
const tags = ref<number[]>([]);
const $t = await useTranslate('create_elem');


/**
 * Методы ----------------
 */
// Поиск тегов
const searchTag = async () => {
  const dto = {
    team_id: teamController.activeTeamId,
    query: tagsValue.value,
  };
  const { data } = await useCustomFetch('team/settings/tags/find', {
    body: dto,
    method: 'POST',
  });
  console.log(data);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
