<template>
  <div class="tags aside-popup" ref="tagsRef" :class="{ active: props.active }">
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
  modelValue: number[];
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

/**
 * Вычисляемые значения ----------------
 */
// Значение доступов
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

/**
 * Системные переменные ----------------
 */
const teamController = useTeamStore(); // Хранилище команд

/**
 * Пользовательские переменные ----------------
 */
const tagsRef = ref(null); // Ref-ссылка на элемент
const tagsValue = ref(''); // Значени поля ввода
const tags = ref([]); // Список тэгов

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

<style lang="scss" scoped></style>
