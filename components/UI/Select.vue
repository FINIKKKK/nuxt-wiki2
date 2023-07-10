<template>
  <div
    ref="selectRef"
    class="select"
    :class="{
      active: isOpen, // Если открыт
      full: props.type === 'full',
    }"
    :data-layout="props.type"
  >
    <!-- Выбранный элемент -->
    <div class="selected" @click="toggleDropdown">
      <span class="placeholder" v-if="!model">Выберите раздел</span>
      <span v-else>{{ model?.label }}</span>
      <svg-icon
        class="close"
        name="close"
        v-if="!props.type && model"
        @click="removeActiveSelect"
      />
      <svg-icon
        class="triangle"
        name="triangle"
        v-if="props.type === 'triangle' || props.type === 'full'"
      />
    </div>
    <!-- Список -->
    <ul v-if="isOpen" class="dropdown">
      <!-- Элемент списка -->
      <li
        v-for="option in options"
        :key="option.value || option.value"
        @click="
          selectOption(option) // Выбирает элемент
        "
        :class="{
          active: option === model, // Активный элемент
        }"
      >
        {{ option.label || option.label }}
      </li>
    </ul>
  </div>
</template>

<!-- ----------------------------------------------------- -->
<!-- ----------------------------------------------------- -->

<script lang="ts" setup>
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { TSelect } from '~/utils/types/base';

/**
 * Пропсы ----------------
 */
const props = defineProps<{
  options: TSelect[];
  modelValue: TSelect | null;
  type?: 'triangle' | 'full';
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
const removeActiveSelect = () => {
  model.value = null;
};
// Переключение между открытием и закрытием селекта
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
// Выбрать нужный элемент из списка
const selectOption = (option: TSelect) => {
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
  &.active {
    .triangle {
      transform: rotate(180deg);
    }
  }
}

.select[data-layout='triangle'] {
  .selected {
    justify-content: space-between;
  }
}

.selected {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: $black;
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
    flex: 0 0 auto;
  }
  .triangle {
    margin-left: 10px;
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
  max-height: 250px;
  overflow: auto;
  background-color: $white;
  border-radius: 2px;
  z-index: 100;
  margin-top: 15px;
  box-shadow: 0 0 3rem 0 rgba(0, 0, 0, 0.08);
  // ScrollBar
  &::-webkit-scrollbar {
    width: 3px;
  }
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

.full {
  border: 1px solid $blue2;
  padding: 14px 24px;
  transition: 0.3s;
  border-radius: 2px;
  width: 100%;
  max-width: 100%;
  .selected {
    width: 100%;
    justify-content: space-between;
    span {
      font-size: 16px !important;
    }
  }
  &:hover {
    border-color: $blue;
  }
  &.active {
    border-color: $blue;
  }
}
</style>
