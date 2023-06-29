<template>
  <div class="tags" ref="tagsRef" :class="{ active: props.active }">
    <h2>Тэги</h2>
    <p>
      itl.wiki создана для совместной работы, делитесь контентом, который вы
      создаете, с вашей командой.
    </p>
    <UIInput
      label="Введиде название метки"
      v-model="tagsValue"
      @keydown.enter="addTag"
      @input="searchTag"
    />
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useCustomFetch } from '~/hooks/useCustomFetch';
import { useTeamStore } from '~/stores/TeamContoller';
import { useOutsideClick } from '~/hooks/useOutsideClick';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  active: boolean;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['closeTagsPopup']);

/**
 * Системные переменные ----------------
 */
const teamController = useTeamStore(); // Хранилище команд

/**
 * Полльзовательские переменные ----------------
 */
const tagsRef = ref(null); // Ref-ссылка на элемент
const tagsValue = ref(''); // Значени поля ввода
const tags = ref([]); // Массив тэгов

/**
 * Хуки ----------------
 */
// Скрывать попап, если нажатие было вне его области
// useOutsideClick(tagsRef, false, () => {
//   emits('closeTagsPopup');
// });

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
// Добавить тэг
const addTag = async () => {
  const dto = {
    team_id: teamController.activeTeamId,
    name: tagsValue.value,
  };
  const { data } = await useCustomFetch('team/settings/tags/add', {
    body: dto,
    method: 'POST',
  });
  tagsValue.value = '';
  tags.value.push(data);
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.tags {
  position: fixed;
  right: 0;
  top: 0;
  background-color: $white;
  padding: 50px 35px;
  min-height: 100vh;
  overflow: auto;
  width: 400px;
  z-index: 100;
  box-shadow: 0 0 10px rgba($blue, 0.3);
  transform: translateX(100%);
  transition: 0.3s;
  &.active {
    transform: translateX(0);
  }
  h2 {
    font-size: 24px;
    margin-bottom: 25px;
  }
  p {
    margin-bottom: 25px;
  }
}
</style>
