<template>
  <div
    ref="selectRef"
    class="select"
    :class="{
      active: isOpen, // Если открыт
    }"
  >
    <!-- Выбранный элемент -->
    <div class="selected" @click="toggleDropdown">
      <span class="placeholder" v-if="!model">Выберите раздел</span>
      <span v-else>{{ model.name }}</span>
      <svg-icon class="close" name="close" v-if="model" @click="model = null" />
    </div>
    <!-- Список -->
    <ul v-if="isOpen" class="dropdown">
      <!-- Элемент списка -->
      <li
        v-for="option in options"
        :key="option.id"
        @click="
          selectOption(option) // Выбирает элемент
        "
        :class="{
          active: option === model, // Активный элемент
        }"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { TSection } from '~/api/models/section';

export type TSelect = {
  id: number;
  name: string;
};

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  options: TSelect[];
  modelValue: TSection | null;
}>();

/**
 * События ----------------
 */
const emits = defineEmits(['update:modelValue']);

/**
 * Вычисляемые значения ----------------
 */
// Значения поля селекта
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});

/**
 * Пользовательские переменные ----------------
 */
const isOpen = ref(false); // Открыт ли select
const selectRef = ref(null); // Ссылка на html элемент селекта

/**
 * Хуки ----------------
 */
// Закрыть select, при клике вне его области
useOutsideClick(selectRef, isOpen);

/**
 * Методы ----------------
 */
// Переключение между открытием и закрытием селекта
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
// Выбрать нужный элемент из списка
const selectOption = (option: any) => {
  model.value = option;
  isOpen.value = false;
};
</script>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<style lang="scss" scoped>
.select {
  position: relative;
  user-select: none;
  max-width: 300px;
}

.selected {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &:hover {
    .close {
      opacity: 1;
    }
  }
  .placeholder {
    font-size: 14px;
    color: $gray;
    transition: 0.3s;
    &:hover {
      color: $blue;
    }
  }
  span {
    font-size: 14px;
  }
  svg {
    width: 13px;
    height: 13px;
  }
  .close {
    margin-left: 15px;
    opacity: 0;
  }
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: $white;
  border-radius: 2px;
  z-index: 100;
  margin-top: 15px;
  box-shadow: 0 0 3rem 0 rgba(0, 0, 0, 0.08);
}

.dropdown li {
  padding: 12px 17px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: $blue2;
  }
  &.active {
    color: $blue;
  }
}
</style>
