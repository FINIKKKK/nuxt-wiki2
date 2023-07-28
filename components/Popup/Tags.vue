<template>
  <Popup
    :title="$t.tagsPopup.title"
    :isOpen="props.isOpen"
    @close="createElemController.closeTags()"
  >
    <p class="text">{{ $t.tagsPopup.text }}</p>

    <UIInput
      :label="$t.tagsPopup.input"
      v-model="inputValue"
      @input="searchTag"
    />
  </Popup>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useCreateElemStore } from '~/stores/CreateElemController';
import { useDebounce } from '~/hooks/useDebounce';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  isOpen: boolean;
}>();

/**
 * Переменные ----------------
 */
const teamController = useTeamStore();
const createElemController = useCreateElemStore();
const inputValue = ref('');
const tags = ref<number[]>([]);
const $t = await useTranslate('create_elem');

/**
 * Методы ----------------
 */
// Поиск тегов
const searchTag = useDebounce(async () => {
  if (inputValue.value) {
    // Данные
    const dto = {
      team_id: teamController.activeTeamId,
      query: inputValue.value,
    };

    // Поиск
    const { data } = await useCustomFetch('team/settings/tags/find', {
      body: dto,
      method: 'POST',
    });
    console.log(data);
  } else {
    // Очищаем
    tags.value = [];
  }
}, 250);
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped></style>
